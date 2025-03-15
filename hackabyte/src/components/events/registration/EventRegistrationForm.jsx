/**
 * Event Registration Form Component
 * 
 * Handles registering for specific events with:
 * - Event-specific information display
 * - Team formation options
 * - Discord tag and other event-specific fields
 * - Experience level selection
 * - Backend API integration with validation
 * - Confirmation and error handling
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Container from '../../shared/Container';

export default function EventRegistrationForm({ eventId }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';
  
  const [event, setEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTeam, setHasTeam] = useState(false);
  
  // React Hook Form setup
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  
  // Watch form values for conditional fields
  const watchHasTeam = watch('hasTeam', false);
  const watchTeamSize = watch('teamSize', '1');
  
  // Set hasTeam state when the form value changes
  useEffect(() => {
    setHasTeam(watchHasTeam === 'true');
  }, [watchHasTeam]);

  // For error display
  const [eventError, setEventError] = useState(null);
  
  // Fetch event details when component mounts or eventId changes
  useEffect(() => {
    const fetchEventDetails = async () => {
      // Reset error state
      setEventError(null);
      
      try {
        if (!eventId) {
          setEventError('No event ID provided');
          return;
        }
        
        // Show toast for loading
        const toastId = toast.info('Loading event details...', { autoClose: false });
        
        const response = await fetch(`/api/events?eventId=${eventId}`);
        
        // Clear loading toast
        toast.dismiss(toastId);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}: Failed to load event details`);
        }
        
        const data = await response.json();
        
        if (data.success && data.event) {
          setEvent(data.event);
          toast.success('Event details loaded successfully');
        } else {
          throw new Error(data.message || 'Event information not available');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setEventError(error.message || 'Could not load event details');
        toast.error('Error loading event: ' + error.message);
      }
    };
    
    fetchEventDetails();
  }, [eventId]);
  
  // Check if user is authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('You must be logged in to register for events');
      // Redirect to login page with return URL
      router.push(`/auth?returnUrl=/events/${eventId}/register`);
    }
  }, [status, router, eventId]);
  
  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Convert string values to appropriate types
      const formattedData = {
        ...data,
        eventId,
        hasTeam: data.hasTeam === 'true',
        teamSize: data.hasTeam === 'true' ? parseInt(data.teamSize) : null,
        needsTeam: data.hasTeam === 'false' && data.needsTeam === 'true'
      };
      
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
      
      // Show success message
      toast.success('Successfully registered for the event!');
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
      
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If loading, show loading state
  if (isLoading) {
    return (
      <Container>
        <div className="py-12 flex justify-center items-center">
          <div className="animate-pulse text-gray-400">
            <svg className="animate-spin h-10 w-10 text-[#FF2247]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </Container>
    );
  }
  
  // If there's an error or no event data, show error state
  if (eventError || !event) {
    return (
      <Container>
        <div className="py-12 flex flex-col items-center justify-center">
          <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 p-8 max-w-lg w-full text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#FF2247] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
            <p className="text-gray-300 mb-6">
              {eventError || "We couldn't find the event you're looking for. It might have been removed or is no longer available."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/events')}
                className="btn-secondary py-2 px-6"
              >
                Browse Events
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="btn-primary py-2 px-6"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
  
  return (
    <Container size="narrow">
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800 mb-12">
        <div className="p-8">
          {/* Event Information Header */}
          <div className="mb-8 pb-6 border-b border-gray-800">
            <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
            <p className="text-[#FF2247] font-medium mb-4">
              {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-300 mb-6">{event.description}</p>
            <div className="flex items-center text-gray-300 mb-2">
              <svg className="h-5 w-5 mr-2 text-[#FF2247]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
          
          {/* Registration Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Registration Details</h2>
            
            {/* Team Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-800">
              <h3 className="text-white text-lg font-medium mb-4">Team Information</h3>
              
              {/* Participating in a team? */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Are you participating in a team?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio"
                      value="true"
                      {...register('hasTeam', { required: 'Please select an option' })} 
                      className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                    />
                    <span className="ml-2 text-gray-300">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio"
                      value="false"
                      {...register('hasTeam', { required: 'Please select an option' })} 
                      className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                    />
                    <span className="ml-2 text-gray-300">No</span>
                  </label>
                </div>
                {errors.hasTeam && (
                  <p className="text-red-500 text-xs mt-1">{errors.hasTeam.message}</p>
                )}
              </div>
              
              {/* Conditional Fields for Team */}
              {hasTeam && (
                <>
                  {/* Team Size */}
                  <div className="mb-4">
                    <label htmlFor="teamSize" className="block text-gray-300 text-sm font-medium mb-2">
                      How many people are in your team (including you)?
                    </label>
                    <select
                      id="teamSize"
                      {...register('teamSize', { required: hasTeam ? 'Team size is required' : false })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                    >
                      <option value="">Select team size</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    {errors.teamSize && (
                      <p className="text-red-500 text-xs mt-1">{errors.teamSize.message}</p>
                    )}
                  </div>
                  
                  {/* Team Member Names */}
                  <div className="mb-4">
                    <label htmlFor="teamMemberNames" className="block text-gray-300 text-sm font-medium mb-2">
                      Names of the other members in your team
                    </label>
                    <textarea
                      id="teamMemberNames"
                      {...register('teamMemberNames', { 
                        required: hasTeam ? 'Team member names are required' : false
                      })}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Enter the full names of your team members"
                      rows="3"
                    ></textarea>
                    {errors.teamMemberNames && (
                      <p className="text-red-500 text-xs mt-1">{errors.teamMemberNames.message}</p>
                    )}
                  </div>
                  
                  {/* Team Name */}
                  <div className="mb-4">
                    <label htmlFor="teamName" className="block text-gray-300 text-sm font-medium mb-2">
                      Team Name (optional)
                    </label>
                    <input
                      type="text"
                      id="teamName"
                      {...register('teamName')}
                      className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                      placeholder="Your team name (if already decided)"
                    />
                    <p className="text-gray-400 text-xs mt-1">
                      If not decided yet, you'll have the opportunity to choose on hackathon day.
                    </p>
                  </div>
                </>
              )}
              
              {/* Needs team placement - only show if not in a team */}
              {!hasTeam && (
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Would you like to be added to a team?
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio"
                        value="true"
                        {...register('needsTeam', { required: !hasTeam ? 'Please select an option' : false })} 
                        className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                      />
                      <span className="ml-2 text-gray-300">Yes, add me to a team</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio"
                        value="false"
                        {...register('needsTeam', { required: !hasTeam ? 'Please select an option' : false })} 
                        className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                      />
                      <span className="ml-2 text-gray-300">No, I want to work alone</span>
                    </label>
                  </div>
                  {errors.needsTeam && (
                    <p className="text-red-500 text-xs mt-1">{errors.needsTeam.message}</p>
                  )}
                </div>
              )}
            </div>
            
            {/* Additional Information Section */}
            <div className="mb-8 pb-6 border-b border-gray-800">
              <h3 className="text-white text-lg font-medium mb-4">Additional Information</h3>
              
              {/* Discord Server Join */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Discord Server
                </label>
                <p className="text-gray-300 mb-2">
                  Please join our Discord server for event communication:
                </p>
                <a 
                  href={event.discordLink || "https://discord.gg/drXX4sZmbX"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block py-2 px-4 mb-2"
                >
                  Join Discord Server
                </a>
                <p className="text-gray-400 text-xs mt-1">
                  Joining our Discord server is required for participation. All event announcements, updates, and communication will happen through Discord.
                </p>
              </div>
              
              {/* Dietary Restrictions */}
              <div className="mb-4">
                <label htmlFor="dietaryRestrictions" className="block text-gray-300 text-sm font-medium mb-2">
                  Dietary Restrictions (optional)
                </label>
                <textarea
                  id="dietaryRestrictions"
                  {...register('dietaryRestrictions')}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="Please specify any dietary restrictions or allergies"
                  rows="3"
                ></textarea>
              </div>
              
              {/* Coding Experience */}
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-300 text-sm font-medium mb-2">
                  What is your coding experience level?
                </label>
                <select
                  id="experience"
                  {...register('experience', { required: 'Please select your experience level' })}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                >
                  <option value="">Select your experience level</option>
                  <option value="Beginner">Beginner (haven't coded before or just started)</option>
                  <option value="Intermediate">Intermediate (know a coding language or two)</option>
                  <option value="Advanced">Advanced (coded for a while, confident in skills)</option>
                </select>
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>
                )}
                <p className="text-gray-400 text-xs mt-1">All experience levels are welcome!</p>
              </div>
              
              {/* How did you learn about this event */}
              <div className="mb-4">
                <label htmlFor="referralSource" className="block text-gray-300 text-sm font-medium mb-2">
                  How did you learn about this event?
                </label>
                <select
                  id="referralSource"
                  {...register('referralSource', { required: 'Please select how you heard about this event' })}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                >
                  <option value="">Select an option</option>
                  <option value="Friend">Friend/Word of mouth</option>
                  <option value="School">School/Teacher</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Previous Event">Previous Hackabyte Event</option>
                  <option value="HackabyteMember">Through a Hackabyte member</option>
                  <option value="Other">Other</option>
                </select>
                {errors.referralSource && (
                  <p className="text-red-500 text-xs mt-1">{errors.referralSource.message}</p>
                )}
              </div>
              
              {/* Questions or Suggestions */}
              <div className="mb-4">
                <label htmlFor="questions" className="block text-gray-300 text-sm font-medium mb-2">
                  Questions or suggestions for the event? (optional)
                </label>
                <textarea
                  id="questions"
                  {...register('questions')}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="Any questions or suggestions you have for us"
                  rows="3"
                ></textarea>
              </div>
              
              {/* Additional Information */}
              <div className="mb-4">
                <label htmlFor="additionalInfo" className="block text-gray-300 text-sm font-medium mb-2">
                  Anything else you'd like us to know? (optional)
                </label>
                <textarea
                  id="additionalInfo"
                  {...register('additionalInfo')}
                  className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
                  placeholder="Any additional information"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            {/* Event Requirements and Terms Section */}
            <div className="mb-8">
              <h3 className="text-white text-lg font-medium mb-4">Event Requirements</h3>
              
              <div className="bg-[#212129] p-4 rounded-lg mb-6">
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Bring your own laptop and charger</li>
                  <li>Food and water will be provided</li>
                  <li>Teams of 1-4 participants are allowed</li>
                  <li>All code must be written during the hackathon</li>
                  <li>Respect the event code of conduct</li>
                </ul>
              </div>
              
              {/* Agreement Checkbox */}
              <div className="mb-6">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox"
                    {...register('agreement', { required: 'You must agree to the terms' })} 
                    className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
                  />
                  <span className="ml-2 text-gray-300">
                    I agree to the event requirements and confirm all information provided is accurate
                  </span>
                </label>
                {errors.agreement && (
                  <p className="text-red-500 text-xs mt-1">{errors.agreement.message}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-3 mb-4 relative"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Complete Registration'
              )}
            </motion.button>
            
            <p className="text-center text-gray-400 text-sm">
              You'll receive a confirmation email once your registration is complete.
            </p>
          </motion.form>
        </div>
      </div>
    </Container>
  );
}
