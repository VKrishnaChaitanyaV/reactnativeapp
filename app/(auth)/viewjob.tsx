import React from 'react';
import { View, Text, StyleSheet, VirtualizedList, TouchableOpacity, ListRenderItem } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Define Job type
type Job = {
  id: string;
  title: string;
  skills: string;
  description: string;
};



// VirtualizedList helper functions
const getItem = (data: Job[], index: number): Job => data[index];
const getItemCount = (data: Job[]): number => data.length;

export default function ViewJob() {
  const renderItem: ListRenderItem<Job> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.skills}>{item.skills}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => console.log('View Details:', item.title)}
      >
        <MaterialIcons name="visibility" size={24} color="#007AFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <VirtualizedList<Job>
        data={jobs}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  skills: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  viewButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});


// Dummy Job Data
const jobs: Job[] = [
    {
      id: '1',
      title: 'React Native Developer',
      skills: 'React Native, JavaScript, Redux',
      description: 'We are looking for a talented React Native developer to join our team and build awesome mobile apps.',
    },
    {
      id: '2',
      title: 'Backend Engineer',
      skills: 'Node.js, Express, MongoDB',
      description: 'Responsible for server-side web application logic and integration with front-end developers.',
    },
    {
      id: '3',
      title: 'Frontend Developer',
      skills: 'React.js, CSS, HTML',
      description: 'Seeking a skilled Frontend Developer to work on high-impact projects using modern frameworks.',
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      skills: 'AWS, Docker, Kubernetes',
      description: 'Manage infrastructure, deployment pipelines, and ensure system reliability and scalability.',
    },
    {
      id: '5',
      title: 'Full Stack Developer',
      skills: 'React, Node.js, SQL',
      description: 'Develop both client-side and server-side logic for complex applications.',
    },
    {
      id: '6',
      title: 'iOS Developer',
      skills: 'Swift, Objective-C, Xcode',
      description: 'Build beautiful and responsive iOS applications for diverse user needs.',
    },
    {
      id: '7',
      title: 'Android Developer',
      skills: 'Kotlin, Java, Android Studio',
      description: 'Create Android apps with high-quality UI/UX and robust backend integration.',
    },
    {
      id: '8',
      title: 'Data Scientist',
      skills: 'Python, TensorFlow, SQL',
      description: 'Analyze large datasets to derive actionable insights and predictive models.',
    },
    {
      id: '9',
      title: 'QA Engineer',
      skills: 'Selenium, Test Automation, Manual Testing',
      description: 'Ensure the quality and performance of products through rigorous testing.',
    },
    {
      id: '10',
      title: 'UI/UX Designer',
      skills: 'Figma, Sketch, Adobe XD',
      description: 'Design intuitive and visually appealing user interfaces and experiences.',
    },
    {
      id: '11',
      title: 'Cloud Architect',
      skills: 'AWS, Azure, GCP',
      description: 'Design scalable cloud solutions and architecture patterns.',
    },
    {
      id: '12',
      title: 'Product Manager',
      skills: 'Agile, Scrum, Product Strategy',
      description: 'Lead product initiatives and ensure alignment with business goals.',
    },
    {
      id: '13',
      title: 'Technical Writer',
      skills: 'Documentation, API Writing, User Manuals',
      description: 'Create clear, concise technical documentation for end users and developers.',
    },
    {
      id: '14',
      title: 'Security Analyst',
      skills: 'Cybersecurity, Firewalls, Risk Management',
      description: 'Monitor and secure networks and systems against cyber threats.',
    },
    {
      id: '15',
      title: 'Blockchain Developer',
      skills: 'Solidity, Ethereum, Smart Contracts',
      description: 'Develop blockchain-based solutions and decentralized applications.',
    },
    {
      id: '16',
      title: 'Machine Learning Engineer',
      skills: 'Machine Learning, Python, PyTorch',
      description: 'Build machine learning pipelines for scalable and real-time applications.',
    },
    {
      id: '17',
      title: 'Business Analyst',
      skills: 'Data Analysis, Requirements Gathering, SQL',
      description: 'Bridge business needs with technical solutions using data-driven decisions.',
    },
    {
      id: '18',
      title: 'Database Administrator',
      skills: 'SQL Server, PostgreSQL, Database Optimization',
      description: 'Maintain and optimize database systems for maximum efficiency.',
    },
    {
      id: '19',
      title: 'AI Researcher',
      skills: 'Deep Learning, Natural Language Processing, Python',
      description: 'Research and develop AI models to solve real-world challenges.',
    },
    {
      id: '20',
      title: 'Mobile App Tester',
      skills: 'Mobile Testing, Appium, Manual Testing',
      description: 'Test mobile applications across various devices and platforms for quality assurance.',
    },
  ];
  