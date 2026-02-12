import { db, firebaseConfigError } from '@/app/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { COLLECTIONS } from './analyticsSchemas';

const TIME_RANGE_DEFAULT = 'week';

function createEmptyAnalytics(timeRange = TIME_RANGE_DEFAULT, error = '') {
  const now = new Date();
  return {
    summary: {
      totalUsers: 0,
      activeEvents: 0,
      registrations: 0,
      pageViews: 0,
      uniqueVisitors: 0,
      userGrowth: 0,
      eventGrowth: 0,
      registrationGrowth: 0,
      pageViewGrowth: 0,
    },
    trafficSeries: [],
    topPages: [],
    users: {
      demographics: [],
      sources: [],
      devices: [],
    },
    events: {
      events: [],
      mostPopularEvent: null,
      highestCompletionRate: null,
      upcomingEvents: 0,
      avgRegistrations: 0,
      totalTrackedEvents: 0,
    },
    meta: {
      timeRange,
      rangeLabel: getRangeLabel(timeRange),
      currentStart: now.toISOString(),
      currentEnd: now.toISOString(),
      lastUpdated: now.toISOString(),
      registrationSource: 'none',
      error,
    },
  };
}

export async function fetchAnalyticsData(timeRange = TIME_RANGE_DEFAULT) {
  if (!db) {
    return createEmptyAnalytics(
      timeRange,
      firebaseConfigError || 'Firebase is not configured.'
    );
  }

  const now = new Date();
  const { currentStart, previousStart, bucketUnit } = getRangeDates(timeRange, now);
  const currentStartTs = Timestamp.fromDate(currentStart);
  const previousStartTs = Timestamp.fromDate(previousStart);

  const [
    dailyMetricsDocs,
    pageViewsDocs,
    usersDocs,
    eventsDocs,
    eventAnalyticsDocs,
    registrationsDocs,
    userAnalyticsDocs,
  ] = await Promise.all([
    safeGetDocs(
      query(
        collection(db, COLLECTIONS.DAILY_METRICS),
        where('date', '>=', previousStartTs),
        orderBy('date', 'asc')
      ),
      COLLECTIONS.DAILY_METRICS
    ),
    safeGetDocs(
      query(
        collection(db, COLLECTIONS.PAGE_VIEWS),
        where('timestamp', '>=', previousStartTs),
        orderBy('timestamp', 'asc')
      ),
      COLLECTIONS.PAGE_VIEWS
    ),
    safeGetDocs(collection(db, COLLECTIONS.USERS), COLLECTIONS.USERS),
    safeGetDocs(collection(db, COLLECTIONS.EVENTS), COLLECTIONS.EVENTS),
    safeGetDocs(collection(db, COLLECTIONS.EVENT_ANALYTICS), COLLECTIONS.EVENT_ANALYTICS),
    safeGetDocs(collection(db, COLLECTIONS.REGISTRATIONS), COLLECTIONS.REGISTRATIONS),
    safeGetDocs(
      query(
        collection(db, COLLECTIONS.USER_ANALYTICS),
        orderBy('lastUpdated', 'desc'),
        limit(1)
      ),
      COLLECTIONS.USER_ANALYTICS
    ),
  ]);

  const currentPageViews = pageViewsDocs.filter((item) =>
    isInDateRange(toDate(item.timestamp), currentStart, now)
  );
  const previousPageViews = pageViewsDocs.filter((item) =>
    isInDateRange(toDate(item.timestamp), previousStart, currentStart)
  );

  const usersCreatedInCurrent = usersDocs.filter((item) =>
    isInDateRange(getUserCreatedAt(item), currentStart, now)
  );
  const usersCreatedInPrevious = usersDocs.filter((item) =>
    isInDateRange(getUserCreatedAt(item), previousStart, currentStart)
  );

  const eventRows = buildEventRows(eventsDocs, eventAnalyticsDocs);

  const registrationsFromMetrics = getRegistrationsFromMetrics(
    dailyMetricsDocs,
    currentStart,
    previousStart,
    now
  );

  const registrationsFromCollection = getRegistrationsFromCollection(
    registrationsDocs,
    currentStart,
    previousStart,
    now
  );

  const eventAnalyticsRegistrationTotal = eventRows.reduce(
    (sum, item) => sum + item.registrations,
    0
  );

  const registrationResult = pickRegistrationSource(
    registrationsFromMetrics,
    registrationsFromCollection,
    eventAnalyticsRegistrationTotal
  );

  const activeEvents = getActiveEvents(eventsDocs, now);
  const previousActiveEvents = getActiveEvents(eventsDocs, currentStart);

  const pageViewsCurrentCount = currentPageViews.length;
  const pageViewsPreviousCount = previousPageViews.length;
  const uniqueVisitorsCurrent = countUniqueVisitors(currentPageViews);

  const trafficSeries = buildTrafficSeries(
    timeRange,
    bucketUnit,
    currentStart,
    now,
    currentPageViews
  );

  const topPages = buildTopPages(currentPageViews);

  const users = buildUserBreakdowns(currentPageViews, usersDocs, userAnalyticsDocs[0]);

  const summary = {
    totalUsers: usersDocs.length,
    activeEvents: activeEvents.length,
    registrations: registrationResult.current,
    pageViews: pageViewsCurrentCount,
    uniqueVisitors: uniqueVisitorsCurrent,
    userGrowth: calculateGrowth(usersCreatedInCurrent.length, usersCreatedInPrevious.length),
    eventGrowth: calculateGrowth(activeEvents.length, previousActiveEvents.length),
    registrationGrowth: calculateGrowth(
      registrationResult.current,
      registrationResult.previous
    ),
    pageViewGrowth: calculateGrowth(pageViewsCurrentCount, pageViewsPreviousCount),
  };

  const mostPopularEvent = eventRows[0] || null;
  const highestCompletionRate =
    [...eventRows].sort((a, b) => b.completionRate - a.completionRate)[0] || null;

  return {
    summary,
    trafficSeries,
    topPages,
    users,
    events: {
      events: eventRows,
      mostPopularEvent,
      highestCompletionRate,
      upcomingEvents: activeEvents.length,
      avgRegistrations:
        eventRows.length > 0
          ? Math.round(
              eventRows.reduce((sum, item) => sum + item.registrations, 0) / eventRows.length
            )
          : 0,
      totalTrackedEvents: eventRows.length,
    },
    meta: {
      timeRange,
      rangeLabel: getRangeLabel(timeRange),
      currentStart: currentStart.toISOString(),
      currentEnd: now.toISOString(),
      lastUpdated: now.toISOString(),
      registrationSource: registrationResult.source,
      error: '',
    },
  };
}

async function safeGetDocs(source, label) {
  try {
    const snapshot = await getDocs(source);
    return snapshot.docs.map((docRef) => ({ id: docRef.id, ...docRef.data() }));
  } catch (error) {
    console.error(`[analytics] Failed to read ${label}:`, error);
    return [];
  }
}

function getRangeDates(timeRange, now) {
  const safeRange = ['day', 'week', 'month', 'year'].includes(timeRange)
    ? timeRange
    : TIME_RANGE_DEFAULT;

  if (safeRange === 'day') {
    const currentStart = startOfDay(now);
    const previousStart = addDays(currentStart, -1);
    return { currentStart, previousStart, bucketUnit: 'hour' };
  }

  if (safeRange === 'week') {
    const currentStart = startOfDay(addDays(now, -6));
    const previousStart = addDays(currentStart, -7);
    return { currentStart, previousStart, bucketUnit: 'day' };
  }

  if (safeRange === 'month') {
    const currentStart = startOfDay(addDays(now, -29));
    const previousStart = addDays(currentStart, -30);
    return { currentStart, previousStart, bucketUnit: 'day' };
  }

  const currentStart = startOfMonth(addMonths(now, -11));
  const previousStart = addMonths(currentStart, -12);
  return { currentStart, previousStart, bucketUnit: 'month' };
}

function getRangeLabel(timeRange) {
  const labels = {
    day: 'Today',
    week: 'Last 7 Days',
    month: 'Last 30 Days',
    year: 'Last 12 Months',
  };
  return labels[timeRange] || labels[TIME_RANGE_DEFAULT];
}

function buildTrafficSeries(timeRange, bucketUnit, start, end, pageViews) {
  const buckets = createBuckets(timeRange, bucketUnit, start, end);
  const bucketsMap = new Map();

  for (const bucket of buckets) {
    bucketsMap.set(bucket.key, {
      ...bucket,
      pageViews: 0,
      uniqueVisitors: 0,
      _visitors: new Set(),
    });
  }

  for (const pageView of pageViews) {
    const date = toDate(pageView.timestamp);
    if (!date) continue;

    const bucketKey = getBucketKey(date, bucketUnit);
    const bucket = bucketsMap.get(bucketKey);

    if (!bucket) continue;

    bucket.pageViews += 1;
    bucket._visitors.add(getVisitorKey(pageView));
  }

  return [...bucketsMap.values()].map((bucket) => ({
    label: bucket.label,
    pageViews: bucket.pageViews,
    uniqueVisitors: bucket._visitors.size,
  }));
}

function createBuckets(timeRange, bucketUnit, start, end) {
  const buckets = [];

  if (bucketUnit === 'hour') {
    const dayStart = startOfDay(start);
    for (let hour = 0; hour < 24; hour += 1) {
      const date = new Date(dayStart);
      date.setHours(hour, 0, 0, 0);
      buckets.push({
        key: getBucketKey(date, 'hour'),
        label: formatHourLabel(date),
      });
    }
    return buckets;
  }

  if (bucketUnit === 'day') {
    const cursor = startOfDay(start);
    const limitDate = startOfDay(end);

    while (cursor <= limitDate) {
      buckets.push({
        key: getBucketKey(cursor, 'day'),
        label: formatDayLabel(cursor, timeRange),
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    return buckets;
  }

  const cursor = startOfMonth(start);
  const limitDate = startOfMonth(end);

  while (cursor <= limitDate) {
    buckets.push({
      key: getBucketKey(cursor, 'month'),
      label: cursor.toLocaleDateString('en-US', { month: 'short' }),
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return buckets;
}

function formatHourLabel(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
}

function formatDayLabel(date, timeRange) {
  if (timeRange === 'week') {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getBucketKey(date, bucketUnit) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  if (bucketUnit === 'hour') {
    const h = String(date.getHours()).padStart(2, '0');
    return `${y}-${m}-${d}-${h}`;
  }

  if (bucketUnit === 'day') {
    return `${y}-${m}-${d}`;
  }

  return `${y}-${m}`;
}

function buildTopPages(pageViews) {
  const pageMap = new Map();

  for (const pageView of pageViews) {
    const path = normalizePath(pageView.path || pageView.page);
    const visitorKey = getVisitorKey(pageView);

    if (!pageMap.has(path)) {
      pageMap.set(path, {
        name: path,
        views: 0,
        uniqueVisitors: 0,
        _visitors: new Set(),
      });
    }

    const page = pageMap.get(path);
    page.views += 1;
    page._visitors.add(visitorKey);
  }

  return [...pageMap.values()]
    .map((item) => ({
      name: item.name,
      views: item.views,
      uniqueVisitors: item._visitors.size,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
}

function buildUserBreakdowns(pageViews, users, latestUserAnalytics) {
  const devices = buildDevices(pageViews);
  const sources = buildSources(pageViews);
  const demographics = buildDemographics(users);

  if (demographics.length > 0 || devices.length > 0 || sources.length > 0) {
    return { demographics, sources, devices };
  }

  return {
    demographics: latestUserAnalytics?.demographics || [],
    sources: latestUserAnalytics?.sources || [],
    devices: latestUserAnalytics?.devices || [],
  };
}

function buildDevices(pageViews) {
  const counts = new Map();

  for (const pageView of pageViews) {
    const key = normalizeDevice(pageView.deviceType);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return mapCountsToArray(counts);
}

function buildSources(pageViews) {
  const counts = new Map();

  for (const pageView of pageViews) {
    const key = classifyTrafficSource(pageView.referrer);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return mapCountsToArray(counts);
}

function buildDemographics(users) {
  const counts = new Map([
    ['Under 13', 0],
    ['13-15', 0],
    ['16-18', 0],
    ['19-24', 0],
    ['25+', 0],
    ['Unknown', 0],
  ]);

  for (const user of users) {
    const birthday = toDate(user.birthday || user.dateOfBirth);
    if (!birthday) {
      counts.set('Unknown', (counts.get('Unknown') || 0) + 1);
      continue;
    }

    const age = calculateAge(birthday);

    if (age < 13) counts.set('Under 13', counts.get('Under 13') + 1);
    else if (age <= 15) counts.set('13-15', counts.get('13-15') + 1);
    else if (age <= 18) counts.set('16-18', counts.get('16-18') + 1);
    else if (age <= 24) counts.set('19-24', counts.get('19-24') + 1);
    else counts.set('25+', counts.get('25+') + 1);
  }

  return mapCountsToArray(counts);
}

function buildEventRows(eventsDocs, eventAnalyticsDocs) {
  const eventsById = new Map(eventsDocs.map((event) => [event.id, event]));
  const rows = [];

  for (const analytic of eventAnalyticsDocs) {
    const eventId = analytic.eventId || analytic.id;
    const eventRecord = eventsById.get(eventId) || {};

    const registrations = toNumber(analytic.registrationCount);
    const attendance = toNumber(analytic.attendanceCount);
    const completionRate =
      registrations > 0 ? Number(((attendance / registrations) * 100).toFixed(1)) : 0;

    rows.push({
      id: eventId,
      name: eventRecord.name || analytic.eventName || eventId || 'Unknown Event',
      registrations,
      attendance,
      viewCount: toNumber(analytic.viewCount),
      completionRate,
      capacity: toNumber(eventRecord.capacity || analytic.capacityCount || 0),
      hasPassed: Boolean(eventRecord.hasPassed),
      startDate: toDate(eventRecord.startDate),
    });
  }

  return rows.sort((a, b) => b.registrations - a.registrations);
}

function getActiveEvents(eventsDocs, referenceDate) {
  return eventsDocs.filter((event) => {
    if (event.hasPassed === true) {
      return false;
    }

    const endDate = toDate(event.endDate || event.startDate);
    if (!endDate) {
      return event.hasPassed !== true;
    }

    return endDate >= referenceDate;
  });
}

function getRegistrationsFromMetrics(metricsDocs, currentStart, previousStart, now) {
  const current = sumFromRange(metricsDocs, 'eventRegistrations', currentStart, now, 'date');
  const previous = sumFromRange(
    metricsDocs,
    'eventRegistrations',
    previousStart,
    currentStart,
    'date'
  );

  return {
    current,
    previous,
    hasData: current > 0 || previous > 0,
  };
}

function getRegistrationsFromCollection(registrationDocs, currentStart, previousStart, now) {
  let current = 0;
  let previous = 0;

  for (const registration of registrationDocs) {
    const timestamp = getRegistrationTimestamp(registration);
    if (!timestamp) continue;

    if (isInDateRange(timestamp, currentStart, now)) {
      current += 1;
    } else if (isInDateRange(timestamp, previousStart, currentStart)) {
      previous += 1;
    }
  }

  return {
    current,
    previous,
    hasData: current > 0 || previous > 0,
  };
}

function pickRegistrationSource(fromMetrics, fromCollection, eventAnalyticsTotal) {
  if (fromMetrics.hasData) {
    return {
      current: fromMetrics.current,
      previous: fromMetrics.previous,
      source: 'dailyMetrics',
    };
  }

  if (fromCollection.hasData) {
    return {
      current: fromCollection.current,
      previous: fromCollection.previous,
      source: 'registrations',
    };
  }

  return {
    current: eventAnalyticsTotal,
    previous: 0,
    source: 'eventAnalytics_total',
  };
}

function sumFromRange(items, field, start, end, dateField) {
  return items.reduce((sum, item) => {
    const date = toDate(item[dateField]);
    if (!isInDateRange(date, start, end)) return sum;
    return sum + toNumber(item[field]);
  }, 0);
}

function mapCountsToArray(counts) {
  return [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
}

function normalizePath(value) {
  if (!value || typeof value !== 'string') {
    return 'Unknown';
  }

  if (value.startsWith('/')) {
    return value;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    try {
      const url = new URL(value);
      return url.pathname || '/';
    } catch (error) {
      return value;
    }
  }

  return value;
}

function normalizeDevice(value) {
  const device = String(value || '').toLowerCase();

  if (device === 'desktop') return 'Desktop';
  if (device === 'mobile') return 'Mobile';
  if (device === 'tablet') return 'Tablet';

  return 'Unknown';
}

function classifyTrafficSource(referrer) {
  if (!referrer) {
    return 'Direct';
  }

  const value = String(referrer).toLowerCase();

  if (!value.startsWith('http')) {
    return 'Direct';
  }

  if (
    value.includes('google.') ||
    value.includes('bing.') ||
    value.includes('yahoo.') ||
    value.includes('duckduckgo.') ||
    value.includes('yandex.')
  ) {
    return 'Search';
  }

  if (
    value.includes('facebook.') ||
    value.includes('instagram.') ||
    value.includes('tiktok.') ||
    value.includes('twitter.') ||
    value.includes('x.com') ||
    value.includes('linkedin.') ||
    value.includes('reddit.') ||
    value.includes('youtube.')
  ) {
    return 'Social';
  }

  if (
    value.includes('mail.') ||
    value.includes('gmail.') ||
    value.includes('outlook.') ||
    value.includes('proton.me')
  ) {
    return 'Email';
  }

  if (value.includes('hackabyte')) {
    return 'Internal';
  }

  return 'Referral';
}

function countUniqueVisitors(pageViews) {
  return new Set(pageViews.map((item) => getVisitorKey(item))).size;
}

function getVisitorKey(pageView) {
  return pageView.userId || pageView.sessionId || pageView.id;
}

function getUserCreatedAt(userDoc) {
  return toDate(userDoc.createdAt || userDoc.timestamp);
}

function getRegistrationTimestamp(registrationDoc) {
  return toDate(
    registrationDoc.createdAt ||
      registrationDoc.timestamp ||
      registrationDoc.registeredAt ||
      registrationDoc.date
  );
}

function calculateGrowth(current, previous) {
  if (previous <= 0) {
    return current > 0 ? 100 : 0;
  }

  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age -= 1;
  }

  return age;
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toDate(value) {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (typeof value?.toDate === 'function') {
    const date = value.toDate();
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value === 'string') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function isInDateRange(date, start, end) {
  if (!date) return false;
  return date >= start && date < end;
}

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function startOfMonth(date) {
  const value = new Date(date);
  value.setDate(1);
  value.setHours(0, 0, 0, 0);
  return value;
}

function addDays(date, days) {
  const value = new Date(date);
  value.setDate(value.getDate() + days);
  return value;
}

function addMonths(date, months) {
  const value = new Date(date);
  value.setMonth(value.getMonth() + months);
  return value;
}
