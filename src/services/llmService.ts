import { Message, Prescription } from '../types';

// This is a mock LLM service. In a real implementation, you would integrate with:
// - OpenAI GPT API
// - Anthropic Claude API
// - Google Gemini API
// - Or any other LLM service

interface LLMResponse {
  message: string;
  prescription?: Prescription;
}

// Mock poetry and music database
const poetryDatabase = [
  {
    title: "The Guest House",
    author: "Rumi",
    excerpt: "This being human is a guest house.\nEvery morning a new arrival.\nA joy, a depression, a meanness,\nsome momentary awareness comes\nas an unexpected visitor.",
    fullText: "This being human is a guest house.\nEvery morning a new arrival.\n\nA joy, a depression, a meanness,\nsome momentary awareness comes\nas an unexpected visitor.\n\nWelcome and entertain them all!\nEven if they're a crowd of sorrows,\nwho violently sweep your house\nempty of its furniture,\nstill, treat each guest honorably.\nHe may be clearing you out\nfor some new delight.\n\nThe dark thought, the shame, the malice,\nmeet them at the door laughing,\nand invite them in.\n\nBe grateful for whoever comes,\nbecause each has been sent\nas a guide from beyond."
  },
  {
    title: "Wild Geese",
    author: "Mary Oliver",
    excerpt: "You do not have to be good.\nYou do not have to walk on your knees\nfor a hundred miles through the desert repenting.\nYou only have to let the soft animal of your body\nlove what it loves.",
    fullText: "You do not have to be good.\nYou do not have to walk on your knees\nfor a hundred miles through the desert repenting.\nYou only have to let the soft animal of your body\nlove what it loves.\nTell me about despair, yours, and I will tell you mine.\nMeanwhile the world goes on.\nMeanwhile the sun and the clear pebbles of the rain\nare moving across the landscapes,\nover the prairies and the deep trees,\nthe mountains and the rivers.\nMeanwhile the wild geese, high in the clean blue air,\nare heading home again.\nWhoever you are, no matter how lonely,\nthe world offers itself to your imagination,\ncalls to you like the wild geese, harsh and exciting—\nover and over announcing your place\nin the family of things."
  },
  {
    title: "Still I Rise",
    author: "Maya Angelou",
    excerpt: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I rise.",
    fullText: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I rise.\n\nDoes my sassiness upset you?\nWhy are you beset with gloom?\n'Cause I walk like I've got oil wells\nPumping in my living room.\n\nJust like moons and like suns,\nWith the certainty of tides,\nJust like hopes springing high,\nStill I'll rise."
  },
  {
    title: "The Peace of Wild Things",
    author: "Wendell Berry",
    excerpt: "When despair for the world grows in me\nand I wake in the night at the least sound\nin fear of what my life and my children's lives may be,\nI go and lie down where the wood drake\nrests in his beauty on the water",
    fullText: "When despair for the world grows in me\nand I wake in the night at the least sound\nin fear of what my life and my children's lives may be,\nI go and lie down where the wood drake\nrests in his beauty on the water, and the great heron feeds.\nI come into the peace of wild things\nwho do not tax their lives with forethought\nof grief. I come into the presence of still water.\nAnd I feel above me the day-blind stars\nwaiting with their light. For a time\nI rest in the grace of the world, and am free."
  }
];

const musicDatabase = [
  {
    title: "Clair de Lune",
    artist: "Claude Debussy",
    genre: "Classical",
    description: "A gentle, flowing piano piece that captures the essence of moonlight and peaceful contemplation."
  },
  {
    title: "Mad World",
    artist: "Gary Jules",
    genre: "Alternative",
    description: "A haunting, introspective cover that speaks to feelings of isolation and disconnection."
  },
  {
    title: "Here Comes the Sun",
    artist: "The Beatles",
    genre: "Rock",
    description: "An uplifting song about hope and renewal after difficult times."
  },
  {
    title: "Weightless",
    artist: "Marconi Union",
    genre: "Ambient",
    description: "Scientifically designed to reduce anxiety and promote relaxation."
  },
  {
    title: "River",
    artist: "Joni Mitchell",
    genre: "Folk",
    description: "A melancholic yet beautiful reflection on longing and the desire for escape."
  }
];

// Simple mood analysis function
function analyzeMood(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('sad') || lowerInput.includes('depressed') || lowerInput.includes('down') || lowerInput.includes('grief')) {
    return 'melancholy';
  }
  if (lowerInput.includes('anxious') || lowerInput.includes('worried') || lowerInput.includes('stress') || lowerInput.includes('overwhelmed')) {
    return 'anxious';
  }
  if (lowerInput.includes('angry') || lowerInput.includes('frustrated') || lowerInput.includes('mad') || lowerInput.includes('rage')) {
    return 'angry';
  }
  if (lowerInput.includes('lonely') || lowerInput.includes('isolated') || lowerInput.includes('alone')) {
    return 'lonely';
  }
  if (lowerInput.includes('happy') || lowerInput.includes('joy') || lowerInput.includes('excited') || lowerInput.includes('good')) {
    return 'joyful';
  }
  if (lowerInput.includes('lost') || lowerInput.includes('confused') || lowerInput.includes('uncertain')) {
    return 'searching';
  }
  
  return 'contemplative';
}

// Mock prescription generator
function generatePrescription(mood: string, userInput: string): Prescription {
  let selectedPoem;
  let selectedMusic;
  let reasoning;

  switch (mood) {
    case 'melancholy':
      selectedPoem = poetryDatabase[0]; // Rumi's Guest House
      selectedMusic = musicDatabase[1]; // Mad World
      reasoning = "When we're feeling down, Rumi's wisdom reminds us that all emotions are temporary visitors. The melancholic beauty of 'Mad World' can help you feel understood in your sadness.";
      break;
    
    case 'anxious':
      selectedPoem = poetryDatabase[3]; // Wendell Berry
      selectedMusic = musicDatabase[3]; // Weightless
      reasoning = "For anxiety, Wendell Berry's connection to nature offers grounding, while 'Weightless' was specifically composed to reduce anxiety and calm the nervous system.";
      break;
    
    case 'lonely':
      selectedPoem = poetryDatabase[1]; // Mary Oliver
      selectedMusic = musicDatabase[4]; // River
      reasoning = "Mary Oliver reminds us of our place in the family of things, while Joni Mitchell's 'River' acknowledges loneliness with beautiful, companionate melancholy.";
      break;
    
    case 'angry':
      selectedPoem = poetryDatabase[2]; // Maya Angelou
      selectedMusic = musicDatabase[2]; // Here Comes the Sun
      reasoning = "Maya Angelou's powerful words channel anger into resilience and strength. 'Here Comes the Sun' offers hope that this storm will pass.";
      break;
    
    case 'joyful':
      selectedPoem = poetryDatabase[1]; // Mary Oliver
      selectedMusic = musicDatabase[2]; // Here Comes the Sun
      reasoning = "Mary Oliver celebrates the joy of being alive and connected to the world. The Beatles' optimistic melody amplifies your positive energy.";
      break;
    
    default:
      selectedPoem = poetryDatabase[0]; // Rumi's Guest House
      selectedMusic = musicDatabase[0]; // Clair de Lune
      reasoning = "Rumi's timeless wisdom about accepting all emotions pairs beautifully with Debussy's contemplative piano, creating space for whatever you're feeling.";
  }

  return {
    id: Date.now().toString(),
    mood: mood,
    poem: selectedPoem,
    music: selectedMusic,
    reasoning: reasoning,
    timestamp: new Date()
  };
}

export async function generateResponse(userInput: string, conversationHistory: Message[]): Promise<LLMResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  const mood = analyzeMood(userInput);
  const prescription = generatePrescription(mood, userInput);

  // Generate a contextual response
  const responses = [
    `I can sense you're feeling ${mood} right now. Let me prescribe something that might resonate with your current state of mind.`,
    `Thank you for sharing what you're going through. I've selected a poem and music that I think will speak to your ${mood} mood.`,
    `I hear you, and I want to offer you something that might provide comfort or insight for what you're experiencing.`,
    `Your feelings are valid and important. Here's a prescription that I hope will meet you where you are right now.`
  ];

  const message = responses[Math.floor(Math.random() * responses.length)];

  return {
    message,
    prescription
  };
}

// Note: To integrate with a real LLM service, replace the mock functions above with actual API calls
// Example for OpenAI:
/*
export async function generateResponse(userInput: string, conversationHistory: Message[]): Promise<LLMResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a therapeutic poetry and music curator. Analyze the user\'s emotional state and prescribe appropriate poetry and music...'
        },
        ...conversationHistory.map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        {
          role: 'user',
          content: userInput
        }
      ]
    })
  });
  
  const data = await response.json();
  // Process the response and return structured data
}
*/