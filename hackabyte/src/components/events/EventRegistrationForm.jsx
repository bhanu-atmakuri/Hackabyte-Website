/**
 * Event Registration Form Component
 * 
 * Handles event-specific registration with:
 * - Team preference options
 * - Event-specific fields from Google Form
 * - Integration with backend API
 * - Form validation
 * - Success/error feedback
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Container from '../shared/Container';

export default function EventRegistrationForm({ eventId }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth?callbackUrl=' + encodeURIComponent(`/events/register?eventId=${eventId}`));
    }
  }, [status, router, eventId]);
  
  // Form status
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [event, setEvent] = useState(null);
  
  // Form fields
  const [teamPreference, setTeamPreference] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [teamName, setTeamName] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [discordJoined, setDiscordJoined] = useState(false);
  const [discordTag, setDiscordTag] = useState('');
  const [codingExperience, setCodingExperience] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [questions, setQuestions] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // For simplicity, we're using imported data rather than fetching from an API
        const { upcomingEvents } = await import('../../lib/data/upcomingEvents');
        const eventData = upcomingEvents.find(e => e.title === eventId);
        
        if (eventData) {
          setEvent(eventData);
        } else {
          setFormError('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setFormError('Failed to load event details');
      }
    };
    
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);
  
  /**
   * Handle form submission
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          teamPreference,
          teamSize: teamSize ? parseInt(teamSize, 10) : undefined,
          teamMembers,
          teamName,
          dietaryRestrictions,
          discordJoined,
          discordTag,
          codingExperience,
          referralSource,
          questions,
          additionalInfo,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setFormError(data.message || 'Registration failed. Please try again.');
      } else {
        setFormSuccess('Registration successful! You will receive a confirmation email shortly.');
        // Clear form or redirect
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }
    } catch (error) {
      setFormError('An error occurred during registration. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF2247]"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </Container>
    );
  }
  
  // If authenticated and event is loaded, show registration form
  return (
    <Container>
      <div className="py-12">
        {event ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{event.title} Registration</h1>
              <p className="text-lg text-gray-300">{event.date} • {event.location}</p>
              <div className="mt-6 p-6 bg-[#16161A] rounded-xl border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Event Details</h2>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="grid md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Date</span>
                    <span>{event.date}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Location</span>
                    <span>{event.location}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-400">Age Groups</span>
                    <span>{event.ageGroups.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Registration Form</h2>
                
                {formError && (
                  <div className="mb-6 p-3 bg-red-900/20 border border-red-900 rounded-lg text-red-400">
                    {formError}
                  </div>
                )}
                
                {formSuccess && (
                  <div className="mb-6 p-3 bg-green-900/20 border border-green-900 rounded-lg text-green-400">
                    {formSuccess}
                  </div>
                )}
                
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                >
                  {/* Team Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Team Information</h3>
                    
                    <div className="mb-6">
                      <label htmlFor="teamPreference" className="block text-gray-300 text-sm font-medium mb-2">
                        Are you participating in a team?
                      </label>
                      <select
                        id="teamPreference"
                        value={teamPreference}
                        onChange={(e) => setTeamPreference(e.target.value)}
                        required
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                        disabled={isLoading}
                      >
                        <option value="">Select an option</option>
                        <option value="Working alone">No, I'm working by myself</option>
                        <option value="Have a team">Yes, I already have a team</option>
                        <option value="Looking for team">I would like to be added to a team</option>
                      </select>
                    </div>
                    
                    {teamPreference === 'Have a team' && (
                      <>
                        <div className="mb-6">
                          <label htmlFor="teamSize" className="block text-gray-300 text-sm font-medium mb-2">
                            How many people are participating in your team (including you)?
                          </label>
                          <select
                            id="teamSize"
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            required
                            className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                            disabled={isLoading}
                          >
                            <option value="">Select team size</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="teamMembers" className="block text-gray-300 text-sm font-medium mb-2">
                            What are the names of the other members?
                          </label>
                          <textarea
                            id="teamMembers"
                            value={teamMembers}
                            onChange={(e) => setTeamMembers(e.target.value)}
                            required
                            className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247] min-h-[100px]"
                            placeholder="List the full names of your team members"
                            disabled={isLoading}
                          />
                          <p className="mt-1 text-xs text-gray-500">Note: Each team member must register separately</p>
                        </div>
                        
                        <div className="mb-6">
                          <label htmlFor="teamName" className="block text-gray-300 text-sm font-medium mb-2">
                            What is your team's name? (If already decided)
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                            placeholder="Team name (optional)"
                            disabled={isLoading}
                          />
                          <p className="mt-1 text-xs text-gray-500">Only one person in your team needs to provide this</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Additional Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
                    
                    <div className="mb-6">
                      <label htmlFor="dietaryRestrictions" className="block text-gray-300 text-sm font-medium mb-2">
                        Do you have any dietary restrictions?
                      </label>
                      <textarea
                        id="dietaryRestrictions"
                        value={dietaryRestrictions}
                        onChange={(e) => setDietaryRestrictions(e.target.value)}
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                        placeholder="Please specify any dietary restrictions or allergies"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Have you joined our Discord Server?
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={discordJoined}
                            onChange={() => setDiscordJoined(true)}
                            className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                            disabled={isLoading}
                          />
                          <span className="ml-2 text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            checked={!discordJoined}
                            onChange={() => setDiscordJoined(false)}
                            className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                            disabled={isLoading}
                          />
                          <span className="ml-2 text-gray-300">No</span>
                        </label>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        We recommend joining our Discord server for event updates: <a href="https://discord.com/invite/JzwUcGJrE7" target="_blank" rel="noopener noreferrer" className="text-[#FF2247] hover:underline">Join Discord</a>
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="discordTag" className="block text-gray-300 text-sm font-medium mb-2">
                        What is your Discord tag? {discordJoined && <span className="text-[#FF2247]">*</span>}
                      </label>
                      <input
                        type="text"
                        id="discordTag"
                        value={discordTag}
                        onChange={(e) => setDiscordTag(e.target.value)}
                        required={discordJoined}
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                        placeholder="username#0000"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="codingExperience" className="block text-gray-300 text-sm font-medium mb-2">
                        What would you consider your coding experience to be?
                      </label>
                      <select
                        id="codingExperience"
                        value={codingExperience}
                        onChange={(e) => setCodingExperience(e.target.value)}
                        required
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                        disabled={isLoading}
                      >
                        <option value="">Select your experience level</option>
                        <option value="Beginner">Beginner (haven't coded before or just recently started)</option>
                        <option value="Intermediate">Intermediate (have coded a decent amount, know a language or two)</option>
                        <option value="Advanced">Advanced (have coded for a while, confident in skills)</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">All experience levels are welcome!</p>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="referralSource" className="block text-gray-300 text-sm font-medium mb-2">
                        How did you learn about us?
                      </label>
                      <input
                        type="text"
                        id="referralSource"
                        value={referralSource}
                        onChange={(e) => setReferralSource(e.target.value)}
                        required
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                        placeholder="Friend, social media, school, etc."
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="questions" className="block text-gray-300 text-sm font-medium mb-2">
                        Any questions/suggestions for the event?
                      </label>
                      <textarea
                        id="questions"
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247] min-h-[100px]"
                        placeholder="Any questions or suggestions you have for us"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="additionalInfo" className="block text-gray-300 text-sm font-medium mb-2">
                        Anything else you would like us to know about?
                      </label>
                      <textarea
                        id="additionalInfo"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247] min-h-[100px]"
                        placeholder="Any additional information we should know"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  {/* Submit button with hover/tap animations */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full btn-primary py-3 mb-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Complete Registration'}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
            <p className="text-gray-300 mb-6">We couldn't find the event you're looking for.</p>
            <a href="/events" className="btn-primary">View All Events</a>
          </div>
        )}
      </div>
    </Container>
  );
}
