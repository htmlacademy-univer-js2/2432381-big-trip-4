const mockDestinations = [
  {
    id: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Tokyo, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Tokyo',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Tokyo parliament building'
      }
    ]
  },
  {
    id: 'cfe516cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Moscow, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Moscow',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Moscow parliament building'
      }
    ]
  },
  {
    id: 'cfe616cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam parliament building'
      }
    ]
  },
  {
    id: 'cfe716cq-10xa-ye10-8077-2fs9a01edcab',
    description: 'Madrid, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Madrid',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Madrid parliament building'
      }
    ]
  },
]

function getDestination() {
  return mockDestinations;
}

export {mockDestinations, getDestination};