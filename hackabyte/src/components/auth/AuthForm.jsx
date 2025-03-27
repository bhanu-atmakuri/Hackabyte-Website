/**
 * Authentication Form Component
 * 
 * A dual-purpose form that handles both user login and registration with:
 * - Tab-based toggle between login and registration views
 * - Multi-step registration process for improved user experience
 * - Form validation for required fields
 * - Age verification with parent/guardian fields for minors
 * - Responsive design that works across screen sizes
 * - Smooth transitions between form states
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../shared/Container';
import { db } from '../../app/firebaseConfig.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../app/firebaseConfig.js';

// Helper function to get user-friendly error messages from Firebase error codes
const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/operation-not-allowed':
      return 'Email/password sign-up is not enabled. Please contact the administrator to enable this authentication method in Firebase console.';
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try signing in or use a different email address.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/weak-password':
      return 'The password is too weak. Please choose a stronger password.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support for assistance.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or create a new account.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

export default function AuthForm() {
  // Router for page navigation
  const router = useRouter();
  
  // State for toggling between login and registration modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Registration step tracking
  const [registrationStep, setRegistrationStep] = useState(1);
  
  // Form field states - Basic Info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [discordTag, setDiscordTag] = useState('');
  const [school, setSchool] = useState('');
  
  // Age verification
  const [isMinor, setIsMinor] = useState(false);
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  
  // Coding Experience
  const [codingExperience, setCodingExperience] = useState({
    Beginner: false,
    Intermediate: false,
    Advanced: false
  });
  
  // Dietary Restrictions
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    Vegetarian: false,
    Vegan: false,
    'Gluten-free': false,
    Treenuts: false,
    Details: ''
  });
  
  // Field validation states
  const [fieldErrors, setFieldErrors] = useState({});
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showFirebaseHelp, setShowFirebaseHelp] = useState(false);
  
  // Validate email format
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Validate phone number format
  const isValidPhone = (phone) => {
    return /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);
  };
  
  // Validate password strength (at least 6 characters)
  const isStrongPassword = (password) => {
    return password.length >= 6;
  };

  // Check if user is under 18 when date of birth changes
  useEffect(() => {
    if (!dateOfBirth) {
      setIsMinor(false);
      return;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    setIsMinor(age < 18);
  }, [dateOfBirth]);

  // Handle coding experience checkbox changes
  const handleCodingExperienceChange = (experience) => {
    setCodingExperience(prev => {
      // Create a new object with all values set to false
      const newExperience = {
        Beginner: false,
        Intermediate: false,
        Advanced: false
      };
      
      // Set the selected experience to true
      newExperience[experience] = true;
      
      return newExperience;
    });
    
    // Clear any previous error for coding experience
    setFieldErrors(prev => ({...prev, codingExperience: null}));
  };

  // Handle dietary restriction checkbox changes
  const handleDietaryRestrictionChange = (restriction) => {
    setDietaryRestrictions(prev => ({
      ...prev,
      [restriction]: !prev[restriction]
    }));
  };

  /**
   * Check if user is an admin
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{isAdmin: boolean, adminId: string|null}>}
   */
  const checkAdminCredentials = async (email, password) => {
    try {
      // Query Firestore for admin user with matching email
      const adminRef = collection(db, 'admins');
      const q = query(adminRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return { isAdmin: false, adminId: null };
      }

      // Check password
      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();

      // In a real app, you should never store plain passwords
      // This is just for demonstration - you should use proper authentication
      if (adminData.password !== password) {
        return { isAdmin: false, adminId: null };
      }

      return { isAdmin: true, adminId: adminDoc.id };
    } catch (error) {
      console.error("Error checking admin credentials:", error);
      return { isAdmin: false, adminId: null };
    }
  };

  /**
   * Validate fields for step 1 (Account Info)
   * @returns {boolean} Whether all fields are valid
   */
  const validateStep1 = () => {
    const errors = {};
    let isValid = true;
    
    // Validate name
    if (!name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }
    
    // Validate email
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!isStrongPassword(password)) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    // Validate password confirmation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setFieldErrors(errors);
    return isValid;
  };
  
  /**
   * Validate fields for step 2 (Personal Info)
   * @returns {boolean} Whether all fields are valid
   */
  const validateStep2 = () => {
    const errors = {};
    let isValid = true;
    
    // Validate date of birth
    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
      isValid = false;
    }
    
    // Validate phone number
    if (!phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    
    // Validate parent/guardian information if user is a minor
    if (isMinor) {
      if (!parentName) {
        errors.parentName = "Parent/guardian name is required";
        isValid = false;
      }
      
      if (!parentEmail) {
        errors.parentEmail = "Parent/guardian email is required";
        isValid = false;
      } else if (!isValidEmail(parentEmail)) {
        errors.parentEmail = "Please enter a valid email address";
        isValid = false;
      }
      
      if (!parentPhone) {
        errors.parentPhone = "Parent/guardian phone is required";
        isValid = false;
      } else if (!isValidPhone(parentPhone)) {
        errors.parentPhone = "Please enter a valid phone number";
        isValid = false;
      }
    }
    
    setFieldErrors(errors);
    return isValid;
  };
  
  /**
   * Validate fields for step 3 (Coding Experience & Dietary Restrictions)
   * @returns {boolean} Whether all fields are valid
   */
  const validateStep3 = () => {
    const errors = {};
    let isValid = true;
    
    // Ensure a coding experience level is selected
    const hasExperienceSelected = Object.values(codingExperience).some(value => value === true);
    if (!hasExperienceSelected) {
      errors.codingExperience = "Please select your coding experience level";
      isValid = false;
    }
    
    setFieldErrors(errors);
    return isValid;
  };

  /**
   * Navigate to next step in registration process
   */
  const goToNextStep = () => {
    // Validate current step
    let isValid = false;
    
    if (registrationStep === 1) {
      isValid = validateStep1();
    } else if (registrationStep === 2) {
      isValid = validateStep2();
    }
    
    if (!isValid) {
      setError("Please correct the errors before continuing.");
      return;
    }
    
    // Clear general error and proceed to next step
    setError('');
    setRegistrationStep(prev => prev + 1);
  };

  /**
   * Go back to previous step in registration
   */
  const goToPreviousStep = () => {
    setError('');
    setRegistrationStep(prev => prev - 1);
  };

  /**
   * Reset the form state when switching between login and registration
   */
  useEffect(() => {
    setError('');
    setFieldErrors({});
    setRegistrationStep(1);
    setShowFirebaseHelp(false);
  }, [isLogin]);

  /**
   * Form submission handler
   * Handles both regular user authentication and admin authentication
   * Routes users to appropriate dashboards based on account type
   * 
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);
    setShowFirebaseHelp(false);
    
    try {
      if (isLogin) {
        // Login mode logic - validate email and password
        if (!email) {
          setFieldErrors(prev => ({...prev, email: "Email is required"}));
          throw new Error("Please enter your email");
        }
        
        if (!password) {
          setFieldErrors(prev => ({...prev, password: "Password is required"}));
          throw new Error("Please enter your password");
        }
      
        try {
          // Use Firebase Auth for regular user login
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Check if this user is also an admin
          const { isAdmin } = await checkAdminCredentials(email, password);
          
          if (isAdmin) {
            // Admin credentials are valid
            // Set admin session
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminEmail', email);
            sessionStorage.setItem('adminId', user.uid);
            
            // Redirect to admin home
            router.push('/admin');
          } else {
            // Regular user login
            sessionStorage.setItem('userLoggedIn', 'true');
            sessionStorage.setItem('userEmail', email);
            
            // Redirect to user dashboard
            router.push('/dashboard');
          }
        } catch (error) {
          console.error("Login error:", error);
          
          // Check for specific Firebase auth errors
          if (error.code === 'auth/operation-not-allowed') {
            setShowFirebaseHelp(true);
          }
          
          setError(getFirebaseErrorMessage(error.code) || "Failed to login. Please check your credentials.");
        }
      } else {
        // Registration mode - validate all steps before submission
        let isValid = true;
        
        // Validate each step
        if (!validateStep1()) {
          setRegistrationStep(1);
          isValid = false;
        } else if (!validateStep2()) {
          setRegistrationStep(2);
          isValid = false;
        } else if (!validateStep3()) {
          setRegistrationStep(3);
          isValid = false;
        }
        
        if (!isValid) {
          throw new Error("Please correct all errors before submitting the form.");
        }

        try {
          // Create user with Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          
          // Format phone as number for Firebase
          const phoneNumber = parseInt(phone.replace(/\D/g, ''), 10) || 0;
          
          // Store complete user data in Firestore
          await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name,
            email,
            password: "", // Don't store actual password in Firestore
            birthday: new Date(dateOfBirth),
            phone: phoneNumber,
            school,
            discordTag,
            codingExperienceLevel: codingExperience,
            dietaryRestrictions,
            isMinor,
            parentName: isMinor ? parentName : "",
            parentEmail: isMinor ? parentEmail : "",
            parentPhone: isMinor ? parentPhone : "",
            createdAt: new Date()
          });
          
          // After successful registration, log the user in
          sessionStorage.setItem('userLoggedIn', 'true');
          sessionStorage.setItem('userEmail', email);
          
          // Redirect to user dashboard
          router.push('/dashboard');
        } catch (error) {
          console.error("Registration error:", error);
          
          // Check for specific Firebase auth errors
          if (error.code === 'auth/operation-not-allowed') {
            setShowFirebaseHelp(true);
          }
          
          setError(getFirebaseErrorMessage(error.code) || "Failed to create account. Please try again.");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render login form
  const renderLoginForm = () => (
    <>
      {/* Email field */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors(prev => ({...prev, email: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="name@example.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password field */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors(prev => ({...prev, password: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.password ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="••••••••"
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
        )}
      </div>

      {/* "Remember me" and "Forgot password" */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-300">
            Remember me
          </label>
        </div>
        <a href="#" className="text-sm text-[#FF2247] hover:underline">
          Forgot password?
        </a>
      </div>
    </>
  );

  // Render registration step 1: Account Info
  const renderRegistrationStep1 = () => (
    <>
      {/* Name field */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors(prev => ({...prev, name: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.name ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="John Doe"
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.name}</p>
        )}
      </div>
      
      {/* Email field */}
      <div className="mb-6">
        <label htmlFor="regEmail" className="block text-gray-300 text-sm font-medium mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="regEmail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors(prev => ({...prev, email: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="name@example.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
        )}
      </div>
      
      {/* Password field */}
      <div className="mb-6">
        <label htmlFor="regPassword" className="block text-gray-300 text-sm font-medium mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="regPassword"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors(prev => ({...prev, password: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.password ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="••••••••"
        />
        {fieldErrors.password && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
        )}
      </div>
      
      {/* Confirm Password field */}
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setFieldErrors(prev => ({...prev, confirmPassword: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="••••••••"
        />
        {fieldErrors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.confirmPassword}</p>
        )}
      </div>
    </>
  );

  // Render registration step 2: Personal Info
  const renderRegistrationStep2 = () => (
    <>
      {/* Date of Birth field */}
      <div className="mb-6">
        <label htmlFor="dateOfBirth" className="block text-gray-300 text-sm font-medium mb-2">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
            setFieldErrors(prev => ({...prev, dateOfBirth: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.dateOfBirth ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
        />
        {fieldErrors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.dateOfBirth}</p>
        )}
      </div>
      
      {/* Phone Number field */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setFieldErrors(prev => ({...prev, phone: null}));
          }}
          required
          className={`bg-[#1A1A1E] border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
          placeholder="(123) 456-7890"
        />
        {fieldErrors.phone && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.phone}</p>
        )}
      </div>
      
      {/* School field */}
      <div className="mb-6">
        <label htmlFor="school" className="block text-gray-300 text-sm font-medium mb-2">
          School
        </label>
        <input
          type="text"
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
          placeholder="Enter your school name"
        />
      </div>
      
      {/* Discord Tag field */}
      <div className="mb-6">
        <label htmlFor="discordTag" className="block text-gray-300 text-sm font-medium mb-2">
          Discord Username
        </label>
        <input
          type="text"
          id="discordTag"
          value={discordTag}
          onChange={(e) => setDiscordTag(e.target.value)}
          className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
          placeholder="username#0000"
        />
      </div>
      
      {/* Conditional parent/guardian fields for minors */}
      {isMinor && (
        <>
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold text-white">Parent/Guardian Information</h3>
            <p className="text-gray-400 text-sm">Required for users under 18 years old.</p>
          </div>

          <div className="mb-6">
            <label htmlFor="parentName" className="block text-gray-300 text-sm font-medium mb-2">
              Parent/Guardian Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="parentName"
              value={parentName}
              onChange={(e) => {
                setParentName(e.target.value);
                setFieldErrors(prev => ({...prev, parentName: null}));
              }}
              required={isMinor}
              className={`bg-[#1A1A1E] border ${fieldErrors.parentName ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
              placeholder="Jane Doe"
            />
            {fieldErrors.parentName && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.parentName}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="parentEmail" className="block text-gray-300 text-sm font-medium mb-2">
              Parent/Guardian Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="parentEmail"
              value={parentEmail}
              onChange={(e) => {
                setParentEmail(e.target.value);
                setFieldErrors(prev => ({...prev, parentEmail: null}));
              }}
              required={isMinor}
              className={`bg-[#1A1A1E] border ${fieldErrors.parentEmail ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
              placeholder="parent@example.com"
            />
            {fieldErrors.parentEmail && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.parentEmail}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="parentPhone" className="block text-gray-300 text-sm font-medium mb-2">
              Parent/Guardian Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="parentPhone"
              value={parentPhone}
              onChange={(e) => {
                setParentPhone(e.target.value);
                setFieldErrors(prev => ({...prev, parentPhone: null}));
              }}
              required={isMinor}
              className={`bg-[#1A1A1E] border ${fieldErrors.parentPhone ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]`}
              placeholder="(123) 456-7890"
            />
            {fieldErrors.parentPhone && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.parentPhone}</p>
            )}
          </div>
        </>
      )}
    </>
  );

  // Render registration step 3: Coding Experience & Dietary Restrictions
  const renderRegistrationStep3 = () => (
    <>
      {/* Coding Experience Level section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-2">Coding Experience Level <span className="text-red-500">*</span></h3>
        <p className="text-gray-400 text-sm mb-4">Please select your level of programming experience:</p>
        
        <div className="space-y-4">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <div key={level} className="flex items-center">
              <input
                type="radio"
                id={`coding-${level}`}
                name="codingExperience"
                checked={codingExperience[level]}
                onChange={() => handleCodingExperienceChange(level)}
                className={`h-4 w-4 bg-[#1A1A1E] border ${fieldErrors.codingExperience ? 'border-red-500' : 'border-gray-700'} rounded focus:ring-[#FF2247]`}
              />
              <label htmlFor={`coding-${level}`} className="ml-3 block text-gray-300">
                {level}
              </label>
            </div>
          ))}
        </div>
        
        {fieldErrors.codingExperience && (
          <p className="mt-1 text-sm text-red-500">{fieldErrors.codingExperience}</p>
        )}
      </div>
      
      {/* Dietary Restrictions section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Dietary Restrictions</h3>
        <p className="text-gray-400 text-sm mb-4">Select any dietary restrictions you have:</p>
        
        <div className="space-y-4 mb-6">
          {["Vegetarian", "Vegan", "Gluten-free", "Treenuts"].map((restriction) => (
            <div key={restriction} className="flex items-center">
              <input
                type="checkbox"
                id={`diet-${restriction}`}
                checked={dietaryRestrictions[restriction]}
                onChange={() => handleDietaryRestrictionChange(restriction)}
                className="h-4 w-4 bg-[#1A1A1E] border border-gray-700 rounded focus:ring-[#FF2247]"
              />
              <label htmlFor={`diet-${restriction}`} className="ml-3 block text-gray-300">
                {restriction}
              </label>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <label htmlFor="dietDetails" className="block text-gray-300 text-sm font-medium mb-2">
            Additional Dietary Information
          </label>
          <textarea
            id="dietDetails"
            value={dietaryRestrictions.Details}
            onChange={(e) => setDietaryRestrictions(prev => ({...prev, Details: e.target.value}))}
            className="bg-[#1A1A1E] border border-gray-700 text-white rounded-lg p-3 w-full focus:ring-[#FF2247] focus:border-[#FF2247]"
            placeholder="Any additional dietary restrictions or allergies..."
            rows={3}
          />
        </div>
      </div>
    </>
  );

  // Render the appropriate step in registration
  const renderRegistrationContent = () => {
    switch (registrationStep) {
      case 1:
        return renderRegistrationStep1();
      case 2:
        return renderRegistrationStep2();
      case 3:
        return renderRegistrationStep3();
      default:
        return renderRegistrationStep1();
    }
  };
  
  // Render registration nav buttons
  const renderRegistrationNav = () => (
    <div className="flex justify-between mt-6 mb-4">
      {registrationStep > 1 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={goToPreviousStep}
          className="px-5 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800"
        >
          Back
        </motion.button>
      )}
      
      <div className="flex-grow"></div> {/* Spacer for flex justify-between */}
      
      {registrationStep < 3 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={goToNextStep}
          className="px-5 py-2 bg-[#FF2247] rounded-lg text-white hover:bg-opacity-90"
        >
          Continue
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-[#FF2247] rounded-lg text-white hover:bg-opacity-90 disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Complete Registration'}
        </motion.button>
      )}
    </div>
  );

  // Render Firebase help instructions when needed
  const renderFirebaseHelp = () => (
    <div className="mt-4 p-4 bg-blue-900/30 text-blue-400 rounded-lg text-sm border border-blue-800">
      <h4 className="font-semibold mb-2">How to enable Email/Password authentication:</h4>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Firebase Console</a></li>
        <li>Select your project</li>
        <li>In the sidebar, click on "Authentication"</li>
        <li>Go to the "Sign-in method" tab</li>
        <li>Find "Email/Password" in the list and click on it</li>
        <li>Toggle the "Enable" switch to enable it</li>
        <li>Click "Save"</li>
      </ol>
    </div>
  );

  return (
    <Container size='half'>
      <div className="bg-[#16161A] rounded-xl shadow-xl overflow-hidden border border-gray-800">
        <div className="p-8">
          {/* Authentication mode toggle tabs */}
          <div className="flex mb-8 border-b border-gray-800">
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                isLogin
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`pb-4 px-4 text-lg font-medium border-b-2 ${
                !isLogin
                  ? 'text-[#FF2247] border-[#FF2247]'
                  : 'text-gray-400 border-transparent hover:text-white'
              } transition-colors`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form with fade-in animation */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            {/* Form Title */}
            <h2 className="text-2xl font-bold text-white mb-6">
              {isLogin ? 'Sign in to your account' : `Create a new account - Step ${registrationStep} of 3`}
            </h2>

            {/* Registration Progress Bar */}
            {!isLogin && (
              <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                <div 
                  className="bg-[#FF2247] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(registrationStep / 3) * 100}%` }}
                ></div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 text-red-400 rounded-lg text-sm border border-red-800">
                {error}
              </div>
            )}
            
            {/* Firebase help instructions */}
            {showFirebaseHelp && renderFirebaseHelp()}

            {/* Form Fields based on mode/step */}
            {isLogin ? renderLoginForm() : renderRegistrationContent()}

            {/* Submit button or step navigation */}
            {isLogin ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 mb-4 disabled:opacity-70"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </motion.button>
            ) : (
              renderRegistrationNav()
            )}

            {/* Mode toggle link - changes text based on current mode */}
            <div className="text-center text-gray-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#FF2247] hover:underline"
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </Container>
  );
}