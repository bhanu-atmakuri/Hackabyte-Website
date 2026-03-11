'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useNoFlash from '@/lib/hooks/useNoFlash';
import { fetchAnalyticsData } from '@/lib/firebase/analytics';
import { trackPageView } from '@/lib/firebase/analyticsService';

const TIME_RANGE_OPTIONS = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: 'year', label: 'Last 12 Months' },
];

const EMPTY_ANALYTICS = {
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
    rangeLabel: '',
    currentStart: '',
    currentEnd: '',
    registrationSource: 'none',
    error: '',
  },
};

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState(EMPTY_ANALYTICS);

  useNoFlash();

  const loadAnalytics = async (manualRefresh = false) => {
    if (manualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      setError('');
      const data = await fetchAnalyticsData(timeRange);
      setAnalyticsData(data || EMPTY_ANALYTICS);

      if (data?.meta?.error) {
        setError(data.meta.error);
      }
    } catch (fetchError) {
      console.error('Failed to fetch analytics data:', fetchError);
      setAnalyticsData(EMPTY_ANALYTICS);
      setError('Failed to load analytics data. Check Firebase config and Firestore permissions.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== 'undefined') {
      trackPageView('Admin Analytics Dashboard', { section: 'analytics' });
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, timeRange]);

  const trafficData = useMemo(
    () => analyticsData?.trafficSeries || [],
    [analyticsData?.trafficSeries]
  );

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">
            {analyticsData.meta.rangeLabel || 'Analytics'}{' '}
            {analyticsData.meta.currentStart && analyticsData.meta.currentEnd
              ? `(${formatDate(analyticsData.meta.currentStart)} - ${formatDate(
                  analyticsData.meta.currentEnd
                )})`
              : ''}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={timeRange}
            onChange={(event) => setTimeRange(event.target.value)}
            className="border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white"
          >
            {TIME_RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => loadAnalytics(true)}
            disabled={refreshing}
            className="border border-[#FF2247]/40 bg-[#FF2247]/10 px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#FF2247] hover:bg-[#FF2247]/20 disabled:opacity-60 transition-colors"
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          title="Total Users"
          value={analyticsData.summary.totalUsers}
          growth={analyticsData.summary.userGrowth}
        />
        <SummaryCard
          title="Page Views"
          value={analyticsData.summary.pageViews}
          growth={analyticsData.summary.pageViewGrowth}
        />
        <SummaryCard
          title="Unique Visitors"
          value={analyticsData.summary.uniqueVisitors}
          growth={null}
        />
        <SummaryCard
          title="Registrations"
          value={analyticsData.summary.registrations}
          growth={analyticsData.summary.registrationGrowth}
          subtext={`Source: ${analyticsData.meta.registrationSource}`}
        />
        <SummaryCard
          title="Active Events"
          value={analyticsData.summary.activeEvents}
          growth={analyticsData.summary.eventGrowth}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-gray-800 bg-[#16161A] p-5 xl:col-span-2">
          <h2 className="text-lg font-semibold text-white">Traffic Trend</h2>
          <p className="mt-1 text-sm text-gray-400">
            Page views and unique visitors over the selected period.
          </p>

          <div className="mt-5 h-80">
            {trafficData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid stroke="#2D2D39" strokeDasharray="3 3" />
                  <XAxis dataKey="label" stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A1E',
                      border: '1px solid #374151',
                      color: '#FFFFFF',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#FF2247"
                    strokeWidth={2}
                    name="Page Views"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="uniqueVisitors"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    name="Unique Visitors"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyPanel message="No page view data available for this time range." />
            )}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-[#16161A] p-5">
          <h2 className="text-lg font-semibold text-white">Top Pages</h2>
          <p className="mt-1 text-sm text-gray-400">Most viewed routes.</p>

          <div className="mt-5 space-y-3">
            {analyticsData.topPages.length > 0 ? (
              analyticsData.topPages.slice(0, 8).map((page) => (
                <div key={page.name} className="rounded-lg border border-gray-800 bg-[#1A1A1E] p-3">
                  <p className="truncate text-sm font-medium text-white">{page.name}</p>
                  <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                    <span>{formatNumber(page.views)} views</span>
                    <span>{formatNumber(page.uniqueVisitors)} visitors</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyPanel message="No page-level traffic captured yet." />
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BreakdownCard title="User Demographics" items={analyticsData.users.demographics} />
        <BreakdownCard title="Traffic Sources" items={analyticsData.users.sources} />
        <BreakdownCard title="Devices" items={analyticsData.users.devices} />
      </div>

      <section className="mt-8 rounded-xl border border-gray-800 bg-[#16161A] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">Event Performance</h2>
          <div className="flex gap-2 text-xs text-gray-400">
            <span className="rounded-md bg-[#1A1A1E] px-2 py-1">
              Upcoming: {analyticsData.events.upcomingEvents}
            </span>
            <span className="rounded-md bg-[#1A1A1E] px-2 py-1">
              Avg Registrations: {analyticsData.events.avgRegistrations}
            </span>
            <span className="rounded-md bg-[#1A1A1E] px-2 py-1">
              Tracked Events: {analyticsData.events.totalTrackedEvents}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <HighlightCard
            label="Most Popular Event"
            value={analyticsData.events.mostPopularEvent?.name || 'No tracked events'}
            detail={
              analyticsData.events.mostPopularEvent
                ? `${formatNumber(analyticsData.events.mostPopularEvent.registrations)} registrations`
                : ''
            }
          />
          <HighlightCard
            label="Highest Completion Rate"
            value={analyticsData.events.highestCompletionRate?.name || 'No tracked events'}
            detail={
              analyticsData.events.highestCompletionRate
                ? `${formatNumber(analyticsData.events.highestCompletionRate.completionRate)}% completion`
                : ''
            }
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-3 py-2">Event</th>
                <th className="px-3 py-2">Registrations</th>
                <th className="px-3 py-2">Attendance</th>
                <th className="px-3 py-2">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {analyticsData.events.events.length > 0 ? (
                analyticsData.events.events.slice(0, 12).map((event) => (
                  <tr key={event.id}>
                    <td className="px-3 py-2 text-white">{event.name}</td>
                    <td className="px-3 py-2 text-gray-300">{formatNumber(event.registrations)}</td>
                    <td className="px-3 py-2 text-gray-300">{formatNumber(event.attendance)}</td>
                    <td className="px-3 py-2 text-gray-300">
                      {formatNumber(event.completionRate)}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-3 py-4 text-gray-400" colSpan={4}>
                    No event analytics data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ title, value, growth, subtext = '' }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#16161A] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-[#FF2247]">{formatNumber(value)}</p>
      <div className="mt-2 flex items-center gap-2">
        {typeof growth === 'number' ? (
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${
              growth >= 0 ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
            }`}
          >
            {growth >= 0 ? '+' : ''}
            {growth.toFixed(1)}%
          </span>
        ) : (
          <span className="rounded-md bg-gray-800 px-2 py-1 text-xs text-gray-400">No trend</span>
        )}
        {subtext ? <span className="text-xs text-gray-400">{subtext}</span> : null}
      </div>
    </div>
  );
}

function BreakdownCard({ title, items }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-xl border border-gray-800 bg-[#16161A] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length > 0 ? (
          items.map((item) => {
            const width = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-gray-300">{item.name}</span>
                  <span className="text-gray-400">
                    {formatNumber(item.value)} ({width}%)
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1A1A1E]">
                  <div
                    className="h-1.5 rounded-full bg-[#FF2247]"
                    style={{ width: `${Math.max(width, 2)}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <EmptyPanel message="No data available." />
        )}
      </div>
    </section>
  );
}

function HighlightCard({ label, value, detail }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#1A1A1E] p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-white">{value}</p>
      {detail ? <p className="mt-1 text-sm text-gray-400">{detail}</p> : null}
    </div>
  );
}

function EmptyPanel({ message }) {
  return (
    <div className="rounded-lg border border-dashed border-gray-700 bg-[#1A1A1E] p-4 text-sm text-gray-400">
      {message}
    </div>
  );
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('en-US');
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch (error) {
    return value;
  }
}
