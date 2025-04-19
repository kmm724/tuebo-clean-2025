// src/data/videoData.ts

export type VideoItem = {
    id: string;
    title: string;
    keywords: string[];
  };
  
  export const videoData: VideoItem[] = [
    {
      id: 'HGeuA4iJ8vI',
      title: 'How Big is the Ocean?',
      keywords: ['ocean', 'water', 'planet', 'earth', 'sea'],
    },
    {
      id: 'gBnvGSg2Ekk',
      title: 'Why Do We Yawn?',
      keywords: ['body', 'yawning', 'science', 'sleep', 'brain'],
    },
    {
      id: 'yHkYz8OKfRQ',
      title: 'All About Volcanoes',
      keywords: ['volcano', 'lava', 'science', 'earth'],
    },
    {
      id: 'ae7U3YAn3h8',
      title: 'What Are Planets?',
      keywords: ['space', 'planets', 'solar system', 'astronomy'],
    },
    {
      id: 'xrlWZkqB5BM',
      title: 'Amazing Animal Facts!',
      keywords: ['animals', 'zoo', 'wildlife', 'fun', 'biology'],
    },
  ];
  