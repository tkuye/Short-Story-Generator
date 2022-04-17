// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi }  from "openai"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    let response = await openai.createCompletion("text-davinci-002", generatePrompt(req.body.prompt as Prompt))
    
  let choices = response.data.choices
  res.status(200).json(choices?choices[0].text:"")
  } catch(err){
    
    res.status(400).json(err)
  }

}

type Prompt = string;



const generatePrompt = (prompt: Prompt) => {
    return {
      prompt: `Genrate a short story about a woman named Mary.

      Mary was alone again on a Saturday. Her father, Harold was on another business trip to Mississippi, and the house was all to herself, which meant she could have pasta every day if she wanted.

      Her medicine for lowering her testosterone levels made her gain weight, and her father was not keen on her pasta indulgence.
      
      I can add tuna too. Some mozzarella. It was so quiet in the house, her thoughts sounded like they were being spoken out loud. In the town of Woodway, Washington, there’s not much to hear besides birdsong and the rumble of an occasional car.
      
      Mary peeled back her fluffy blanket and stiffly walked to the kitchen. She connected her iPhone to the old karaoke speaker no one used for karaoke and put on Cardi B. A 808 beat reverberated off the high living room ceiling. Cardi’s rhymes and ghetto style among blue jay calls.
      
      As she sat down on the red leather couch of the TV room, she started to jam pasta in her mouth out of hunger and indulgence. Basketball Wives was playing.
      
      “Moshik, you never told me you were a liar,” a glamorous, full-figured black woman said on the show.
      
      Moshik looked her up and down. “You can believe whatever you want. But I ain’t no liar,” her bangles clinking as she settled her hands on her hips.
      
      Mary was hardly listening. She was looking through her Instagram messages to see if she could hook up with her friends.
      
      Over 10 or so minutes, she gave a sigh. Both from the weight of the pasta and her friends being incognito.
      
      “I’m bored,” she said decisively.
      
      She pondered about crazy things to do. Hit mailboxes in my car . . . did that last week. Prank call Domino’s Pizza . . . I need Brian over for the voices. Damn.
      
      Shifting to look to through the mail for anything that was hers, she noticed a letter from the Woodway Nunnery. The idea of going to the Nunnery popped in her mind. I’ve passed by it many times, but never went inside. I might as well mess around there.
      
      She grabbed her Jansport backpack and stuffed a water bottle, iPhone, raincoat, and a granola bar in there. I’m all set for that crazy place.
      
      It was early fall, and the leaves were only showing their first signs of change. A slight wind brushed Mary’s brown hair back as she walked down her home street. No kids or cars on the street. Just her thoughts drifting in and out. I wish dad would get a wife. Mom has been gone already for seven years. I like being alone, but sometimes I am too alone.
      
      She passed the rich homes as she started the downhill journey to the Nunnery. Covered by forests, each home was a universe of its own. Secrets tucked away.
      
      The Nunnery was only about 7-10 minute walk away from her home, but Mary never gave it serious thought to enter the complex before. Boredom can do a number on anybody. At the moment, it seemed like the only exciting thing to do.
      
      As she approached the gates of the complex, she felt her throat tighten up. Her steps became heavy. Birdsong seemed even more sonorous near to the Nunnery. The large, intricate metal gate was little ajar. Mary looked around—no cars were approaching and no pedestrians in sight. She slipped in the small open space and immediately took in his surroundings. All the trees were large douglas firs or spruces covered with vines. The street leading to the monastery was cracked and crossed with ivy.
      
      There was a small garden on the left of the Nunnery with a fountain that attracted her eye. She walked as silently as she could towards it. The slight sound of the wind and the distant whoosh of waves of Richmond Beach below could be heard.
      
      The garden was well maintained, with very short grass, a large bed of roses, and area for a multitude of other flowers. The lawn wrapped around the back of the main building, where a white stone bench was, overlooking the Puget Sound. Mary turned around to look through the building’s windows and saw no at all inside the rooms. There also was no human voice to be heard. Are the nuns on break, or have they gone somewhere?
      
      Moments after she had that thought, a voice startled her as she continued walking through the long strip of garden. “Are you a visitor?” a husky, yet sweet voice said.
      
      Mary jumped around to see a lady of about 60 years old, in a traditional black and white nun dress, with a smirk on her face.
      
      “Ah, yes, I’ve never been here. Just looking around.” Mary had trouble maintaining direct eye contact with the nun.
      
      “Oh, very good. Might you come in and see the Nunnery with me?” the smirk now gone.
    

        Genrate a short story about ${prompt}.
      `,  
      temperature: 1,
      stop:"[stop]",
      presence_penalty: 0.3,
      max_tokens: 700
      
    }
}