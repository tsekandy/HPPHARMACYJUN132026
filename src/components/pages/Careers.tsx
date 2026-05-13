import React from 'react';
import { ArrowLeft, Briefcase, Heart, Award, GraduationCap, Clock, CheckCircle, Mail } from 'lucide-react';

interface CareersProps {
  onBack: () => void;
}

export default function Careers({ onBack }: CareersProps) {
  const handleApplyForPosition = (position: { title: string; department: string; location: string; requirements: string[] }) => {
    const subject = encodeURIComponent(`Job Application - ${position.title} Position`);
    const requirementsText = position.requirements.map(req => `- ${req}`).join('\n');
    const body = encodeURIComponent(`Dear Hiring Department,

I am interested in applying for the ${position.title} position at Happy Pills Pharmacy.

POSITION DETAILS:
Title: ${position.title}
Department: ${position.department}
Location: ${position.location}

REQUIREMENTS:
${requirementsText}

APPLICANT INFORMATION:
Please provide the following in your response:
- Full Name
- Email Address
- Phone Number
- Years of Experience
- Educational Background
- Cover Letter / Motivation

I am excited about the opportunity to contribute to your team and look forward to discussing my qualifications further.

Best regards`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=happypillspharmacy@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleContactHR = () => {
    const subject = encodeURIComponent('HR Inquiry - Career Opportunities');
    const body = encodeURIComponent(`Dear Hiring Department,

I would like to inquire about career opportunities at Happy Pills Pharmacy.

Please provide me with information about:
- Available positions
- Application requirements
- Interview process
- Company benefits

I look forward to hearing from you.

Best regards`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=happypillspharmacy@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: 'Competitive Salary',
      description: 'Attractive compensation packages with performance bonuses'
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: 'Health Benefits',
      description: 'Comprehensive health insurance and medical benefits'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary-600" />,
      title: 'Professional Development',
      description: 'Continuous learning opportunities and career advancement'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: 'Work-Life Balance',
      description: 'Flexible scheduling and supportive work environment'
    }
  ];

  const openPositions = [
    {
      title: 'Licensed Pharmacist',
      department: 'Pharmacy Services',
      type: 'Full-time',
      location: 'Nansana, Kampala',
      description: 'Licensed pharmacist to provide professional pharmaceutical services and customer consultation.',
      requirements: [
        'Bachelor\'s degree in Pharmacy',
        'Valid pharmacy license in Uganda',
        'Minimum 2 years experience',
        'Excellent communication skills'
      ]
    },
    {
      title: 'Pharmacy Assistant',
      department: 'Pharmacy Services',
      type: 'Full-time',
      location: 'Nansana, Kampala',
      description: 'Support licensed pharmacists in daily operations and customer service.',
      requirements: [
        'Diploma in Pharmacy or related field',
        'Customer service experience',
        'Attention to detail',
        'Basic computer skills'
      ]
    },
    {
      title: 'Customer Service Representative',
      department: 'Customer Relations',
      type: 'Full-time',
      location: 'Nansana, Kampala',
      description: 'Handle customer inquiries, process orders, and provide excellent customer support.',
      requirements: [
        'High school diploma or equivalent',
        'Strong communication skills',
        'Customer service experience',
        'Proficiency in English and local languages'
      ]
    },
    {
      title: 'Delivery Coordinator',
      department: 'Logistics',
      type: 'Full-time',
      location: 'Kampala Region',
      description: 'Coordinate medication deliveries and manage logistics operations.',
      requirements: [
        'Valid driving license',
        'Knowledge of Kampala areas',
        'Organizational skills',
        'Smartphone proficiency'
      ]
    },
    {
      title: 'Office Assistant',
      department: 'Administration',
      type: 'Full-time',
      location: 'Nansana, Kampala',
      description: 'Provide administrative support to pharmacy operations and management team.',
      requirements: [
        'High school diploma or equivalent',
        'Basic computer skills (MS Office)',
        'Strong organizational abilities',
        'Good communication skills',
        'Attention to detail'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="section-container py-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-6">
            <Briefcase className="w-9 h-9 text-primary-600" />
          </div>
          <h1 className="heading-lg text-neutral-900 mb-4">Join Our Team</h1>
          <div className="divider mx-auto mb-6" />
          <p className="text-body-lg max-w-3xl mx-auto">
            Be part of a dynamic team committed to improving healthcare access across Uganda.
            Discover rewarding career opportunities at Happy Pills Pharmacy.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Why Work With Us?</h2>
          <div className="divider mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="heading-sm text-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-body-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-neutral-50 section-padding">
        <div className="section-container">
          <h2 className="heading-md text-neutral-900 mb-2 text-center">Open Positions</h2>
          <div className="divider mx-auto mb-10" />
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="card p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="heading-sm text-neutral-900 mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="badge bg-primary-50 text-primary-700">
                        {position.department}
                      </span>
                      <span className="badge bg-neutral-100 text-neutral-700">
                        {position.type}
                      </span>
                      <span className="badge bg-neutral-100 text-neutral-700">
                        {position.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-body mb-4">{position.description}</p>

                <h4 className="font-semibold text-neutral-900 mb-3">Requirements:</h4>
                <ul className="space-y-2 mb-5">
                  {position.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-start text-body-sm">
                      <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 mr-2.5 flex-shrink-0" />
                      <span className="text-neutral-700">{requirement}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleApplyForPosition(position)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Apply for This Position
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply Section */}
      <section className="section-padding bg-neutral-50">
        <div className="section-container text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="heading-md text-neutral-900 mb-4">Easy Application Process</h2>
          <p className="text-body-lg text-neutral-600">
            Click "Apply for This Position" above and an email will open with the job details pre-filled.
            Simply add your information and send your application to happypillspharmacy@gmail.com.
          </p>
        </div>
      </section>

      {/* Contact HR */}
      <section className="bg-primary-700 section-padding">
        <div className="section-container text-center">
          <h2 className="heading-md text-white mb-4">Questions About Careers?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Our HR team is ready to answer your questions about career opportunities.
          </p>
          <button
            onClick={handleContactHR}
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Contact HR Department
          </button>
        </div>
      </section>
    </div>
  );
}
