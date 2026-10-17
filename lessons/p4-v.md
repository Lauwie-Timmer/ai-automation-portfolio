## topic: What clients mean and why it's more than a workflow | ask
Clients ask for "an AI that answers the phone" or "a WhatsApp bot". These need more than a workflow: a **platform**, extra **cost**, and **compliance** work. This step is about answering honestly without building one.

Your honest position: **you have built text assistants and workflows.** Voice and WhatsApp are a separate project that you would scope on its own.
know: Say why voice and WhatsApp are bigger than a workflow
Q: Why is "an AI receptionist" more than a workflow?
A: It needs a phone or messaging platform, extra running costs and compliance work on top of the logic.

## topic: WhatsApp agents | whatsapp
Businesses use the **WhatsApp Business Platform** through Meta or a provider. Facts to know (Meta's docs and pricing change, so check them live):
- It needs a **verified business** and a **phone number** for the account.
- **Opt-in:** customers must agree to hear from you. A bot can't just message everyone.
- **Message templates:** messages *you start* must use **templates approved by Meta**.
- When a **customer messages you**, a 24-hour customer service window opens in which you can reply with free-form messages at no charge.
- Since **1 July 2025** pricing is **per message**, by **category** (marketing, utility, authentication) and by the recipient's **country**; marketing messages cost the most.
- It handles personal data, so **GDPR** applies.

**Where n8n fits:** n8n does the business logic (look up a booking, write to a CRM) that the messaging platform calls through a **webhook**, which needs a public URL (p6-4).
know: List what a WhatsApp bot needs before it can message customers
know: Explain what a template is and when the 24-hour window applies
know: Say how WhatsApp pricing works
Q: Why can't a WhatsApp bot just message everyone?
A: Customers must opt in, and messages you start must use Meta-approved templates, each charged by category and country.
Q: What is the 24-hour window?
A: After a customer messages the business, it can reply with free-form messages for 24 hours at no charge.
Q: How is WhatsApp Business Platform priced?
A: Per message, by category (marketing, utility, authentication) and country, since July 2025.

## topic: Voice agents | voice
A voice agent chains **speech-to-text** (turn the caller's words into text), a **language model** (decide the answer) and **text-to-speech** (say it back) over a **phone line**. A provider such as **Twilio** supplies the number and the call handling.

Things to know:
- **Latency** is the quality problem: the delay between the caller stopping and the answer starting. Every stage adds delay, so calls feel awkward if it's slow.
- **Cost is per minute** (the number, the call, the speech and the model add up), so a long call or many calls matter.
- **Recording calls needs consent.** Rules differ by country, so find out before recording and tell the caller.
- Callers talk over the bot, spell names badly and go off topic; plan a **handover to a human**.
know: Name the three stages of a voice agent
know: Say what causes delay and what costs money in a voice agent
know: Say what recording calls requires
Q: What are the three stages of a voice agent?
A: Speech-to-text, a language model, and text-to-speech, over a phone line.
Q: What causes delay and what are costs based on?
A: Each stage adds delay. Costs are per minute across the number, call, speech and model.
Q: Who must agree before you record a call?
A: The people on the call; rules vary by country, so check and tell the caller.

## topic: Your honest answer | answer
For the notes file use today's real prices from the live pricing pages (WhatsApp's Meta pricing page, Twilio's voice pricing) and list the compliance points.

A good 5-sentence answer to "can you build me an AI receptionist that answers calls?" says: **what you have built** (text assistants and workflows), **what a phone agent needs** (a provider, a number, speech services), **what it costs** to run (per minute), **the rules** (consent for recording, GDPR), and **what you would and wouldn't promise** (a scoped pilot with a clear fallback to a human, no promise of perfect understanding).

Never promise a delay time, accuracy or full automation you haven't measured.
know: Write a five-sentence honest answer about an AI receptionist
know: Say what you would refuse to promise
Q: What five things does the receptionist answer cover?
A: What I've built, what a phone agent needs, what it costs, the rules, and what I would and wouldn't promise.
Q: Name something you must not promise.
A: A guaranteed response time, accuracy or full automation I haven't measured.
