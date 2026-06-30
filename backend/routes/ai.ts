import { Router } from 'express';
import { ChatGroq } from '@langchain/groq';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-jwt-key-for-development-only';

// Read from environment variable
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

// Middleware to verify token
const authenticate = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/analyze-matchup', authenticate, async (req, res) => {
  const { teamA, teamB } = req.body;
  if (!teamA || !teamB) {
    return res.status(400).json({ error: 'Missing teamA or teamB' });
  }

  try {
    // LangChain IBM Requirement Implementation
    const model = new ChatGroq({
      apiKey: GROQ_API_KEY,
      model: "mixtral-8x7b-32768",
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `You are an elite soccer tactician. Provide a pre-match analysis for {teamA} vs {teamB}. 
Return the response as a JSON object with strictly these keys:
- "narrative": A 2-paragraph tactical breakdown.
- "winProbability": An object with "home" and "away" integer percentages that sum to 100.
- "keyMatchup": A short string describing the most important player or positional battle.
Do not return any text outside of the JSON block. Do not use markdown blocks, just return raw JSON string.`
    );

    const parser = new StringOutputParser();
    const chain = promptTemplate.pipe(model).pipe(parser);

    const content = await chain.invoke({ teamA, teamB });

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse JSON from Groq via LangChain');

    const analysis = JSON.parse(jsonMatch[0]);
    res.json({ analysis });

  } catch (error) {
    console.error('LangChain Groq API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI analysis' });
  }
});

router.post('/live-insight', authenticate, async (req, res) => {
  const { matchData } = req.body;
  if (!matchData) {
    return res.status(400).json({ error: 'Missing matchData' });
  }

  try {
    const model = new ChatGroq({
      apiKey: GROQ_API_KEY,
      model: "mixtral-8x7b-32768",
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `You are an elite soccer tactician watching a live match. The current match is {homeTeam} vs {awayTeam}. 
The score is {homeScore} - {awayScore}. 
Here are the recent events: {events}

Provide a short, 2-sentence tactical insight on what is currently happening in the match and what to expect next. 
Return the response as a simple JSON object with the key "insight". Do not return anything outside the JSON block.`
    );

    const parser = new StringOutputParser();
    const chain = promptTemplate.pipe(model).pipe(parser);

    const content = await chain.invoke({ 
      homeTeam: matchData.homeTeam, 
      awayTeam: matchData.awayTeam, 
      homeScore: matchData.homeScore, 
      awayScore: matchData.awayScore,
      events: JSON.stringify(matchData.events)
    });

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Failed to parse JSON from Groq via LangChain');

    const result = JSON.parse(jsonMatch[0]);
    res.json({ insight: result.insight });

  } catch (error) {
    console.error('LangChain Groq API Error:', error);
    res.status(500).json({ error: 'Failed to generate live insight' });
  }
});

router.post('/chat', authenticate, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Missing message' });
  }

  try {
    const model = new ChatGroq({
      apiKey: GROQ_API_KEY,
      model: "mixtral-8x7b-32768",
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `You are an AI Soccer Tactician and Analyst. A user is asking you a question about soccer rules, tactics, players, or matches.
Provide a clear, engaging, and expert answer. Keep it concise but highly informative.
User question: {question}`
    );

    const parser = new StringOutputParser();
    const chain = promptTemplate.pipe(model).pipe(parser);

    const reply = await chain.invoke({ question: message });
    res.json({ reply });

  } catch (error) {
    console.error('LangChain Chat Error:', error);
    res.status(500).json({ error: 'Failed to generate chat response' });
  }
});

export default router;
