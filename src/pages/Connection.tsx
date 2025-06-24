import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, Star, Camera, User } from 'lucide-react';
import { PageContainer } from '../components/Layout/PageContainer';
import { Button } from '../components/UI/Button';
import { Checkbox } from '../components/UI/Checkbox';
import { FilterOptions } from '../types';

// Mock user data
const mockUsers = [
  { id: '1', name: 'Ahmed', score: 4.8, isOnline: true, avatar: 'camera', category: 'University Student', age: '18 - 24' },
  { id: '2', name: 'Sara', score: 4.9, isOnline: true, avatar: 'avatar', category: 'School Student', age: 'Under 18' },
  { id: '3', name: 'Omar', score: 4.7, isOnline: true, avatar: 'camera', category: 'Freelancer', age: '18 - 24' },
  { id: '4', name: 'Layla', score: 4.6, isOnline: true, avatar: 'avatar', category: 'University Student', age: 'Over 24' },
  { id: '5', name: 'Hassan', score: 4.8, isOnline: true, avatar: 'camera', category: 'Private Sector Employee', age: '18 - 24' },
  { id: '6', name: 'Fatima', score: 4.9, isOnline: true, avatar: 'avatar', category: 'School Student', age: 'Under 18' },
];

export const Connection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    educationalCategory: [],
    ageGroup: [],
    academicSubjects: {
      enabled: false,
      highSchool: { enabled: false, subjects: [] },
      university: { enabled: false, subjects: [] },
    },
    selfLearning: { enabled: false, topics: [] },
  });

  const sessionOptions = location.state?.sessionOptions;
  const cameraOption = location.state?.cameraOption;

  const educationalCategories = [
    'University Student',
    'School Student', 
    'Freelancer',
    'Private Sector Employee',
    'Government Employee'
  ];

  const ageGroups = ['Under 18', '18 - 24', 'Over 24'];

  const highSchoolSubjects = ['Physics', 'Biology', 'Chemistry', 'Arabic'];
  const universitySubjects = ['Math 1', 'Math 2', 'Circuits 1', 'Circuits 2'];
  const selfLearningTopics = ['Embedded Systems', 'Cybersecurity', 'Artificial Intelligence', 'Entrepreneurship'];

  const handleStartSession = () => {
    if (selectedUser) {
      // Simulate session duration, then go to rating
      setTimeout(() => {
        navigate('/rating', { state: { partnerId: selectedUser, sessionOptions, cameraOption } });
      }, 2000); // 2 seconds for demo purposes
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    if (filters.educationalCategory.length > 0 && !filters.educationalCategory.includes(user.category)) {
      return false;
    }
    if (filters.ageGroup.length > 0 && !filters.ageGroup.includes(user.age)) {
      return false;
    }
    return true;
  });

  return (
    <PageContainer className="relative">
      <div className="w-full max-w-6xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-sawa-blue text-white">
          <h2 className="text-xl font-semibold">Find Study Partners</h2>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-sawa-blue"
          >
            <Filter size={20} className="mr-2" />
            Filtering
          </Button>
        </div>

        <div className="flex h-full">
          {/* User Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedUser === user.id
                      ? 'border-sawa-orange bg-sawa-orange/10'
                      : 'border-gray-300 hover:border-sawa-orange/50'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-sawa-light-gray rounded-full flex items-center justify-center mr-3">
                      {user.avatar === 'camera' ? (
                        <Camera size={20} className="text-sawa-blue" />
                      ) : (
                        <User size={20} className="text-sawa-blue" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sawa-blue">{user.name}</h3>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{user.score}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>{user.category}</p>
                    <p>{user.age}</p>
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedUser && (
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
                <Button onClick={handleStartSession} className="px-8">
                  Start Session with {mockUsers.find(u => u.id === selectedUser)?.name}
                </Button>
              </div>
            )}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="w-80 bg-sawa-light-gray p-6 overflow-y-auto border-l">
              <h3 className="font-semibold text-sawa-blue mb-4">Filter Options</h3>
              
              {/* Educational Category */}
              <div className="mb-6">
                <h4 className="font-medium text-sawa-blue mb-2">Educational Category</h4>
                <div className="space-y-2">
                  {educationalCategories.map((category) => (
                    <Checkbox
                      key={category}
                      label={category}
                      checked={filters.educationalCategory.includes(category)}
                      onChange={(checked) => {
                        setFilters(prev => ({
                          ...prev,
                          educationalCategory: checked
                            ? [...prev.educationalCategory, category]
                            : prev.educationalCategory.filter(c => c !== category)
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Age Group */}
              <div className="mb-6">
                <h4 className="font-medium text-sawa-blue mb-2">Age Group</h4>
                <div className="space-y-2">
                  {ageGroups.map((age) => (
                    <Checkbox
                      key={age}
                      label={age}
                      checked={filters.ageGroup.includes(age)}
                      onChange={(checked) => {
                        setFilters(prev => ({
                          ...prev,
                          ageGroup: checked
                            ? [...prev.ageGroup, age]
                            : prev.ageGroup.filter(a => a !== age)
                        }));
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Field of Interest */}
              <div className="mb-6">
                <h4 className="font-medium text-sawa-blue mb-2">Field of Interest</h4>
                
                {/* Academic Subjects */}
                <div className="mb-4">
                  <Checkbox
                    label="Academic Subjects"
                    checked={filters.academicSubjects.enabled}
                    onChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        academicSubjects: { ...prev.academicSubjects, enabled: checked }
                      }));
                    }}
                  />
                  
                  {filters.academicSubjects.enabled && (
                    <div className="ml-6 mt-2 space-y-2">
                      <Checkbox
                        label="High School Student"
                        checked={filters.academicSubjects.highSchool.enabled}
                        onChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            academicSubjects: { 
                              ...prev.academicSubjects, 
                              highSchool: { ...prev.academicSubjects.highSchool, enabled: checked }
                            }
                          }));
                        }}
                      />
                      
                      {filters.academicSubjects.highSchool.enabled && (
                        <div className="ml-6 space-y-1">
                          {highSchoolSubjects.map((subject) => (
                            <Checkbox
                              key={subject}
                              label={subject}
                              checked={filters.academicSubjects.highSchool.subjects.includes(subject)}
                              onChange={(checked) => {
                                setFilters(prev => ({
                                  ...prev,
                                  academicSubjects: {
                                    ...prev.academicSubjects,
                                    highSchool: {
                                      ...prev.academicSubjects.highSchool,
                                      subjects: checked
                                        ? [...prev.academicSubjects.highSchool.subjects, subject]
                                        : prev.academicSubjects.highSchool.subjects.filter(s => s !== subject)
                                    }
                                  }
                                }));
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      <Checkbox
                        label="University Student"
                        checked={filters.academicSubjects.university.enabled}
                        onChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            academicSubjects: { 
                              ...prev.academicSubjects, 
                              university: { ...prev.academicSubjects.university, enabled: checked }
                            }
                          }));
                        }}
                      />
                      
                      {filters.academicSubjects.university.enabled && (
                        <div className="ml-6 space-y-1">
                          {universitySubjects.map((subject) => (
                            <Checkbox
                              key={subject}
                              label={subject}
                              checked={filters.academicSubjects.university.subjects.includes(subject)}
                              onChange={(checked) => {
                                setFilters(prev => ({
                                  ...prev,
                                  academicSubjects: {
                                    ...prev.academicSubjects,
                                    university: {
                                      ...prev.academicSubjects.university,
                                      subjects: checked
                                        ? [...prev.academicSubjects.university.subjects, subject]
                                        : prev.academicSubjects.university.subjects.filter(s => s !== subject)
                                    }
                                  }
                                }));
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Self-Learning / Work */}
                <div>
                  <Checkbox
                    label="Self-Learning / Work"
                    checked={filters.selfLearning.enabled}
                    onChange={(checked) => {
                      setFilters(prev => ({
                        ...prev,
                        selfLearning: { ...prev.selfLearning, enabled: checked }
                      }));
                    }}
                  />
                  
                  {filters.selfLearning.enabled && (
                    <div className="ml-6 mt-2 space-y-1">
                      {selfLearningTopics.map((topic) => (
                        <Checkbox
                          key={topic}
                          label={topic}
                          checked={filters.selfLearning.topics.includes(topic)}
                          onChange={(checked) => {
                            setFilters(prev => ({
                              ...prev,
                              selfLearning: {
                                ...prev.selfLearning,
                                topics: checked
                                  ? [...prev.selfLearning.topics, topic]
                                  : prev.selfLearning.topics.filter(t => t !== topic)
                              }
                            }));
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                variant="secondary" 
                onClick={() => setShowFilters(false)}
                className="w-full"
              >
                Apply Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};