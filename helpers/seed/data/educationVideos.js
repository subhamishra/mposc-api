const Data = [
  {
    title: 'Safe to Sleep',
    description: 'how to safely sleep',
    sourceUrl: 'src/Assets/videos/S2S_540P.mp4',
    thumbnailUrl: 'src/Assets/Images/videothumbnail.jpg',
    points: 100,
    quizPoints: 50,
    children: [
        {
          question: "Which of these is not part of the Safe2Sleep program?",
          options: ["Swaddling", "Empty Crib", "Sleep Alone", "Smoke Free"],
          correctAnswerIndex: 0
        },
        {
          question: "What IS allowed in the crib?",
          options: ["Fitted sheet", "Blanket", "Toys", "Bumpers"],
          correctAnswerIndex: 0
        }
    ]
  },
  {
    title: 'Breastfeeding',
    description: 'how to safely sleep',
    sourceUrl: 'src/Assets/videos/S2S_540P.mp4',
    thumbnailUrl: 'src/Assets/Images/videothumbnail.jpg',
    points: 100,
    quizPoints: 50,
    children: [
      {
        question: "What are some good reasons to breastfeed?",
        options: ["Helps you to lose weight after the baby is born", "Helps the baby to get the best food", "Helps the baby to be as healthy as possible", "All of the above"],
        correctAnswerIndex: 3
      },
      {
        question: "Which of the following are times when you should NOT breastfeed?",
        options: ["The mom has HIV or tuberculosis", "The mom is still working on her recovery", "All of the above"],
        correctAnswerIndex: 2
      },
    ]
  },
  {
    title: 'Contingency Management',
    description: 'how to safely sleep',
    sourceUrl: 'src/Assets/videos/S2S_540P.mp4',
    thumbnailUrl: 'src/Assets/Images/videothumbnail.jpg',
    points: 100,
    quizPoints: 50,
    children: [
      {
        question: "How do clinic staff members verify the person should get the points?",
        options: [
          "Staff member can request a urine sample and test for the presence of drugs",
          "Staff member can request the person blow into a breathalyzer to confirm absence of alcohol use.",
          "Staff member can check visit records to make sure the person attended group therapy class.",
          "All of the above",
        ],
        correctAnswerIndex: 3,
      },
      {
        question: "Is contingency management used alone or in combination with other therapies?",
        options: [
          "Almost always alone…it is effective and reduces costs to just offer prizes for healthy behaviors",
          "Usually in combination with other therapies to increase the chance of success",
        ],
        correctAnswerIndex: 1,
      },
    ]
  },
  {
    title: 'Parenting Knowledge/Development Knowledge',
    description: 'how to safely sleep',
    sourceUrl: 'src/Assets/videos/S2S_540P.mp4',
    thumbnailUrl: 'src/Assets/Images/videothumbnail.jpg',
    points: 100,
    quizPoints: 50,
    children: [
      {
        question: "Why do you give newborn babies black and white toys?",
        options: [
          "Babies prefer stripes to any other pattern",
          "Babies don’t see very well right after birth so high-contrast toys capture their attention best",
          "Babies can’t see colors until they are much older",
        ],
        correctAnswerIndex: 1,
      },
      {
        question: "When can babies learn to recognize your voice?",
        options: [
          "When you start reading to them at 3-4 months",
          "Before birth, so sing and talk to them BEFORE the baby is born",
          "Not until they are about 7-8 months old and can sit up on their own.",
        ],
        correctAnswerIndex: 1,
      },
    ]
  },
  {
    title: 'Self-Compassion',
    description: 'how to safely sleep',
    sourceUrl: 'src/Assets/videos/S2S_540P.mp4',
    thumbnailUrl: 'src/Assets/Images/videothumbnail.jpg',
    points: 100,
  },
]

const LookupType = "MicrolearningEducationVideo"

module.exports = {
  Data: Data,
  LookupType: LookupType,
};
