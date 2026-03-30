# Form Patterns Documentation

Comprehensive examples and patterns for building accessible, user-friendly forms using the PocketAgent Design System.

## Overview

Forms are critical touchpoints in user interfaces. The PocketAgent Design System provides patterns that ensure forms are accessible, consistent, and provide excellent user experience across all devices.

## Basic Form Patterns

### Simple Contact Form

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  return (
    <Box as="form" maxWidth="500px" mx="auto" p="l">
      <Text as="h2" fontSize="xl" fontWeight="bold" mb="l">
        Contact Us
      </Text>

      {/* Name Field */}
      <Box mb="m">
        <Text as="label" htmlFor="name" fontSize="s" fontWeight="medium" mb="xs" display="block">
          Full Name
        </Text>
        <Field
          id="name"
          as="input"
          type="text"
          placeholder="Enter your full name"
          variant="outline"
          $size="medium"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name && (
          <Text id="name-error" fontSize="xs" color="error" mt="xs" role="alert">
            {errors.name}
          </Text>
        )}
      </Box>

      {/* Email Field */}
      <Box mb="m">
        <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium" mb="xs" display="block">
          Email Address
        </Text>
        <Field
          id="email"
          as="input"
          type="email"
          placeholder="Enter your email"
          variant="outline"
          $size="medium"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : "email-help"}
          required
        />
        {errors.email ? (
          <Text id="email-error" fontSize="xs" color="error" mt="xs" role="alert">
            {errors.email}
          </Text>
        ) : (
          <Text id="email-help" fontSize="xs" color="secondary" mt="xs">
            We'll never share your email with anyone else
          </Text>
        )}
      </Box>

      {/* Message Field */}
      <Box mb="l">
        <Text as="label" htmlFor="message" fontSize="s" fontWeight="medium" mb="xs" display="block">
          Message
        </Text>
        <Field
          id="message"
          as="textarea"
          placeholder="Tell us how we can help..."
          variant="outline"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message && (
          <Text id="message-error" fontSize="xs" color="error" mt="xs" role="alert">
            {errors.message}
          </Text>
        )}
      </Box>

      {/* Submit Button */}
      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" variant="primary" $size="large">
          Send Message
        </Button>
      </Box>
    </Box>
  );
}
```

### Registration Form

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  return (
    <Box as="form" maxWidth="600px" mx="auto" p="l">
      <Text as="h2" fontSize="xl" fontWeight="bold" mb="s">
        Create Your Account
      </Text>
      <Text as="p" fontSize="s" color="secondary" mb="l">
        Join thousands of users who trust PocketAgent
      </Text>

      {/* Name Fields Row */}
      <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m" mb="m">
        <FormField
          label="First Name"
          id="firstName"
          type="text"
          placeholder="First name"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />
        <FormField
          label="Last Name"
          id="lastName"
          type="text"
          placeholder="Last name"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />
      </Box>

      {/* Email Field */}
      <FormField
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        helpText="This will be your login username"
        required
        mb="m"
      />

      {/* Password Fields */}
      <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m" mb="m">
        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          helpText="At least 8 characters"
          required
        />
        <FormField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          required
        />
      </Box>

      {/* Terms Agreement */}
      <Box mb="l">
        <Box display="flex" alignItems="flex-start" gap="s">
          <Field
            as="input"
            type="checkbox"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
            mt="2px"
            required
          />
          <Text as="label" htmlFor="agreeToTerms" fontSize="s" lineHeight="relaxed">
            I agree to the{' '}
            <Text as="a" href="/terms" color="primary" textDecoration="underline">
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text as="a" href="/privacy" color="primary" textDecoration="underline">
              Privacy Policy
            </Text>
          </Text>
        </Box>
      </Box>

      {/* Submit Button */}
      <Button type="submit" variant="primary" $size="large" fullWidth>
        Create Account
      </Button>

      {/* Login Link */}
      <Box textAlign="center" mt="m">
        <Text fontSize="s" color="secondary">
          Already have an account?{' '}
          <Text as="a" href="/login" color="primary" fontWeight="medium">
            Sign in
          </Text>
        </Text>
      </Box>
    </Box>
  );
}
```

## Advanced Form Patterns

### Multi-Step Form

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    
    // Step 2: Company Info
    company: '',
    role: '',
    teamSize: '',
    
    // Step 3: Preferences
    notifications: [],
    newsletter: false,
    marketing: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <Box maxWidth="600px" mx="auto" p="l">
      {/* Progress Header */}
      <Box mb="xl">
        <Text as="h2" fontSize="xl" fontWeight="bold" mb="s">
          Account Setup
        </Text>
        <Text fontSize="s" color="secondary" mb="m">
          Step {currentStep} of {totalSteps}
        </Text>
        
        {/* Progress Bar */}
        <Box bg="neutral.3" height="4px" shape="rounded" overflow="hidden">
          <Box
            bg="primary"
            height="100%"
            width={`${progress}%`}
            transition="width 0.3s ease"
          />
        </Box>
      </Box>

      <Box as="form">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Box>
            <Text as="h3" fontSize="l" fontWeight="semibold" mb="m">
              Basic Information
            </Text>
            
            <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m" mb="m">
              <FormField
                label="First Name"
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
              />
              <FormField
                label="Last Name"
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </Box>
            
            <FormField
              label="Email Address"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              helpText="We'll use this to send you important updates"
              required
              mb="l"
            />
          </Box>
        )}

        {/* Step 2: Company Information */}
        {currentStep === 2 && (
          <Box>
            <Text as="h3" fontSize="l" fontWeight="semibold" mb="m">
              Company Information
            </Text>
            
            <FormField
              label="Company Name"
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              required
              mb="m"
            />
            
            <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="m" mb="l">
              <Box>
                <Text as="label" htmlFor="role" fontSize="s" fontWeight="medium" mb="xs" display="block">
                  Your Role
                </Text>
                <Field
                  as="select"
                  id="role"
                  variant="outline"
                  $size="medium"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  required
                >
                  <option value="">Select your role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="founder">Founder/CEO</option>
                  <option value="other">Other</option>
                </Field>
              </Box>
              
              <Box>
                <Text as="label" htmlFor="teamSize" fontSize="s" fontWeight="medium" mb="xs" display="block">
                  Team Size
                </Text>
                <Field
                  as="select"
                  id="teamSize"
                  variant="outline"
                  $size="medium"
                  value={formData.teamSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                  required
                >
                  <option value="">Select team size</option>
                  <option value="1">Just me</option>
                  <option value="2-10">2-10 people</option>
                  <option value="11-50">11-50 people</option>
                  <option value="51-200">51-200 people</option>
                  <option value="200+">200+ people</option>
                </Field>
              </Box>
            </Box>
          </Box>
        )}

        {/* Step 3: Preferences */}
        {currentStep === 3 && (
          <Box>
            <Text as="h3" fontSize="l" fontWeight="semibold" mb="m">
              Communication Preferences
            </Text>
            
            <Box mb="m">
              <Text fontSize="s" fontWeight="medium" mb="s" display="block">
                Email Notifications
              </Text>
              
              <Box display="flex" flexDirection="column" gap="s">
                {[
                  { value: 'updates', label: 'Product updates and new features' },
                  { value: 'security', label: 'Security alerts and account activity' },
                  { value: 'tips', label: 'Tips and best practices' },
                  { value: 'news', label: 'Company news and announcements' }
                ].map(option => (
                  <Box key={option.value} display="flex" alignItems="center" gap="s">
                    <Field
                      as="input"
                      type="checkbox"
                      id={option.value}
                      value={option.value}
                      checked={formData.notifications.includes(option.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setFormData(prev => ({
                          ...prev,
                          notifications: isChecked 
                            ? [...prev.notifications, option.value]
                            : prev.notifications.filter(n => n !== option.value)
                        }));
                      }}
                    />
                    <Text as="label" htmlFor={option.value} fontSize="s">
                      {option.label}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box display="flex" flexDirection="column" gap="s" mb="l">
              <Box display="flex" alignItems="center" gap="s">
                <Field
                  as="input"
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
                />
                <Text as="label" htmlFor="newsletter" fontSize="s">
                  Subscribe to our monthly newsletter
                </Text>
              </Box>
              
              <Box display="flex" alignItems="center" gap="s">
                <Field
                  as="input"
                  type="checkbox"
                  id="marketing"
                  checked={formData.marketing}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketing: e.target.checked }))}
                />
                <Text as="label" htmlFor="marketing" fontSize="s">
                  Receive marketing communications and promotions
                </Text>
              </Box>
            </Box>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                $size="medium"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
          </Box>
          
          <Box>
            {currentStep < totalSteps ? (
              <Button
                type="button"
                variant="primary"
                $size="medium"
                onClick={nextStep}
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                $size="medium"
              >
                Complete Setup
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
```

### Form with Validation

```jsx
function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    age: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value) return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
        return '';
        
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
        
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
        return '';
        
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
        
      case 'website':
        if (value && !/^https?:\/\/.+/.test(value)) return 'Website must start with http:// or https://';
        return '';
        
      case 'age':
        if (!value) return 'Age is required';
        const ageNum = parseInt(value);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) return 'Please enter a valid age between 13 and 120';
        return '';
        
      default:
        return '';
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit data
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="500px" mx="auto" p="l">
      <Text as="h2" fontSize="xl" fontWeight="bold" mb="l">
        Create Account
      </Text>

      <ValidatedField
        label="Username"
        id="username"
        type="text"
        placeholder="Enter username"
        value={formData.username}
        onChange={(e) => handleChange('username', e.target.value)}
        onBlur={() => handleBlur('username')}
        error={touched.username ? errors.username : ''}
        required
        mb="m"
      />

      <ValidatedField
        label="Email Address"
        id="email"
        type="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email ? errors.email : ''}
        required
        mb="m"
      />

      <ValidatedField
        label="Password"
        id="password"
        type="password"
        placeholder="Create password"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password ? errors.password : ''}
        helpText="Must contain uppercase, lowercase, and number"
        required
        mb="m"
      />

      <ValidatedField
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={touched.confirmPassword ? errors.confirmPassword : ''}
        required
        mb="m"
      />

      <ValidatedField
        label="Website (Optional)"
        id="website"
        type="url"
        placeholder="https://example.com"
        value={formData.website}
        onChange={(e) => handleChange('website', e.target.value)}
        onBlur={() => handleBlur('website')}
        error={touched.website ? errors.website : ''}
        mb="m"
      />

      <ValidatedField
        label="Age"
        id="age"
        type="number"
        placeholder="Enter age"
        value={formData.age}
        onChange={(e) => handleChange('age', e.target.value)}
        onBlur={() => handleBlur('age')}
        error={touched.age ? errors.age : ''}
        min="13"
        max="120"
        required
        mb="l"
      />

      <Button type="submit" variant="primary" $size="large" fullWidth>
        Create Account
      </Button>
    </Box>
  );
}
```

## Form Components

### Reusable FormField Component

```jsx
function FormField({ 
  label, 
  id, 
  error, 
  helpText, 
  required, 
  mb = "m",
  ...fieldProps 
}) {
  return (
    <Box mb={mb}>
      <Text 
        as="label" 
        htmlFor={id} 
        fontSize="s" 
        fontWeight="medium" 
        mb="xs" 
        display="block"
      >
        {label}
        {required && (
          <Text as="span" color="error" ml="mini" aria-label="required">
            *
          </Text>
        )}
      </Text>
      
      <Field
        id={id}
        variant="outline"
        $size="medium"
        invalid={!!error}
        aria-describedby={
          error ? `${id}-error` : 
          helpText ? `${id}-help` : 
          undefined
        }
        {...fieldProps}
      />
      
      {error && (
        <Text 
          id={`${id}-error`} 
          fontSize="xs" 
          color="error" 
          mt="xs" 
          role="alert"
        >
          {error}
        </Text>
      )}
      
      {helpText && !error && (
        <Text 
          id={`${id}-help`} 
          fontSize="xs" 
          color="secondary" 
          mt="xs"
        >
          {helpText}
        </Text>
      )}
    </Box>
  );
}
```

### ValidatedField Component

```jsx
function ValidatedField({ error, ...props }) {
  const hasError = !!error;
  
  return (
    <FormField
      {...props}
      error={error}
      aria-invalid={hasError}
    />
  );
}
```

### FileUpload Component

```jsx
function FileUpload({ 
  label, 
  id, 
  accept, 
  multiple = false, 
  maxSize = 5 * 1024 * 1024, // 5MB
  onFileSelect,
  error,
  ...props 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter(file => {
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize / 1024 / 1024}MB.`);
        return false;
      }
      return true;
    });
    
    setFiles(multiple ? [...files, ...newFiles] : newFiles);
    onFileSelect?.(multiple ? [...files, ...newFiles] : newFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  return (
    <Box {...props}>
      <Text as="label" fontSize="s" fontWeight="medium" mb="xs" display="block">
        {label}
      </Text>
      
      <Box
        border="2px dashed"
        borderColor={dragActive ? "primary" : "neutral.4"}
        bg={dragActive ? "palette.brands.1" : "neutral.1"}
        p="l"
        shape="rounded"
        textAlign="center"
        cursor="pointer"
        transition="all 0.2s ease"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Field
          ref={fileInputRef}
          as="input"
          type="file"
          id={id}
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          display="none"
        />
        
        <Text fontSize="m" color="secondary" mb="xs">
          📁 Drop files here or click to browse
        </Text>
        <Text fontSize="xs" color="tertiary">
          Maximum file size: {maxSize / 1024 / 1024}MB
        </Text>
      </Box>

      {files.length > 0 && (
        <Box mt="s">
          <Text fontSize="s" fontWeight="medium" mb="xs">
            Selected Files:
          </Text>
          {files.map((file, index) => (
            <Box 
              key={index}
              display="flex" 
              alignItems="center" 
              justifyContent="space-between"
              p="xs"
              bg="neutral.2"
              shape="rounded"
              mb="xs"
            >
              <Text fontSize="s">{file.name}</Text>
              <Button
                variant="ghost"
                $size="small"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {error && (
        <Text fontSize="xs" color="error" mt="xs" role="alert">
          {error}
        </Text>
      )}
    </Box>
  );
}
```

## Form Layout Patterns

### Side-by-Side Layout

```jsx
function SideBySideForm() {
  return (
    <Box display="grid" gridTemplateColumns={["1fr", "1fr 1fr"]} gap="xl" maxWidth="1000px" mx="auto" p="l">
      {/* Left Column - Form */}
      <Box>
        <Text as="h2" fontSize="xl" fontWeight="bold" mb="m">
          Get Started
        </Text>
        
        <Box as="form" display="flex" flexDirection="column" gap="m">
          <FormField
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your name"
            required
          />
          
          <FormField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          
          <FormField
            label="Company"
            id="company"
            type="text"
            placeholder="Your company name"
          />
          
          <Button variant="primary" $size="large" type="submit">
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Right Column - Information */}
      <Box skin="panel" p="l" shape="rounded">
        <Text as="h3" fontSize="l" fontWeight="semibold" mb="m">
          Why Choose PocketAgent?
        </Text>
        
        <Box display="flex" flexDirection="column" gap="m">
          <Box display="flex" gap="s">
            <Text fontSize="l">✨</Text>
            <Box>
              <Text fontWeight="medium" mb="xs">Easy Setup</Text>
              <Text fontSize="s" color="secondary">
                Get started in minutes with our intuitive interface
              </Text>
            </Box>
          </Box>
          
          <Box display="flex" gap="s">
            <Text fontSize="l">🔒</Text>
            <Box>
              <Text fontWeight="medium" mb="xs">Secure & Private</Text>
              <Text fontSize="s" color="secondary">
                Your data is encrypted and protected with enterprise-grade security
              </Text>
            </Box>
          </Box>
          
          <Box display="flex" gap="s">
            <Text fontSize="l">⚡</Text>
            <Box>
              <Text fontWeight="medium" mb="xs">Lightning Fast</Text>
              <Text fontSize="s" color="secondary">
                Optimized for performance with instant responses
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
```

### Card-Based Form

```jsx
function CardForm() {
  return (
    <Box maxWidth="500px" mx="auto" p="l">
      <Box skin="card" p="l" shape="rounded">