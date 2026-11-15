import { FRIEND_QUESTIONS } from './dualQuestions';
import { FRIEND_GUIDANCE } from './friendGuidance';

type Answers = Record<number, string | string[]>;
type PairRead = readonly [title: string, interpretation: string, agreement: string];

// These are conversation rules for stated preferences, not severity or compatibility scores.
const pairs: Record<number, Record<string, PairRead>> = {
  1: {
    '01': ['Comfort and novelty', 'One person chose familiar time together; the other chose a new experience. The setting may need negotiating even when both want company.', 'Choose a familiar meeting place, then add one new activity that either person can decline.'],
    '02': ['One-on-one and group time', 'An evening together and a full-group outing offer different kinds of connection. Neither choice establishes how much someone values the friendship.', 'Plan some one-on-one time alongside an optional group invitation; agree when you will switch settings.'],
    '03': ['Relaxed time and a planned outing', 'You both chose intentional time together, with different levels of structure and travel.', 'Choose an outing with a clear start and finish, leaving one unplanned stretch for food and conversation.'],
    '12': ['A new experience and a familiar group', 'One choice emphasizes discovery; the other emphasizes shared social time. A group plan does not automatically offer the same experience as trying something new.', 'Suggest one new activity the group could join, and check whether either person would prefer a smaller plan.'],
    '13': ['Adventure with different amounts of structure', 'Both choices can include a new experience. The difference is how much of the day to decide in advance.', 'Agree on transport, budget, and a finish time; leave one activity open to choose together.'],
    '23': ['Group energy and a day-trip plan', 'You chose different settings and planning commitments. Ask about group size before assuming you want the same outing.', 'Choose who to invite and the time commitment first, then decide whether a shorter group activity or a day trip fits both.'],
  },
  2: {
    '01': ['Daily contact and intentional check-ins', 'Both choices make room for regular contact, with different preferred frequency. Frequent messages need not require equally frequent replies.', 'Try a few agreed check-ins, with everyday memes clearly optional to answer.'],
    '02': ['Daily connection and room to disappear', 'Daily updates and guilt-free gaps imply different default expectations. Without a conversation, each person could interpret the same quiet period differently.', 'Agree on a small busy signal, what counts as urgent, and whether ordinary messages can wait without explanation.'],
    '03': ['Everyday sharing and practical messages', 'One person chose ongoing everyday contact; the other mainly chose messages for arranging time together.', 'Keep a clear channel for plans and try one occasional personal check-in that does not require a running conversation.'],
    '12': ['Regular check-ins and flexible gaps', 'A few meaningful check-ins and natural returns after days offline can overlap, but the timing needs to be understood.', 'Choose a flexible catch-up window and make it easy to say when a week has no room.'],
    '13': ['Conversation and coordination', 'Both choices may involve fewer messages. The difference is whether contact itself or arranging a meeting is the main purpose.', 'Attach a brief personal catch-up to a planning conversation, and check that this gives both enough contact.'],
    '23': ['Two ways to keep messages light', 'Neither option calls for constant updates. Returning naturally and mostly coordinating plans are still different uses of the same channel.', 'Use messages freely for plans and make clear that an ordinary late reply does not require an apology.'],
  },
  3: {
    '01': ['Listening first and practical ideas', 'You want different first responses to a hard day. This says what each person wants to receive; it does not establish what either person currently gives.', 'Ask “listening or ideas?” before responding. Listen first for the person who wants to vent; offer options when advice is requested.'],
    '02': ['Being heard and getting a break', 'One person wants room to talk; the other wants relief through humor or an activity. Distraction may be welcome for one and premature for the other.', 'Ask whether to stay with the story or take a break from it. Offer humor after checking that it would help.'],
    '03': ['Immediate listening and space first', 'Talking through a hard day and settling alone before a check-in call for different timing. Neither preference means rejecting support.', 'Ask whether company is wanted now. If space is chosen, agree whether and when to check back.'],
    '12': ['Practical options and a change of scene', 'Problem-solving and distraction can both help, but each addresses a different immediate need.', 'Ask whether to think through a next step or do something unrelated; leave the other option available later.'],
    '13': ['Ideas now and space before a check-in', 'One person wants practical help first; the other wants time before engaging. Advice offered too early may miss the preferred timing.', 'Check readiness before offering options. For a space-first response, agree on a later invitation to talk.'],
    '23': ['Company and solitary space', 'Humor or an activity provides company, while space-first support leaves room to settle alone. Ask before interpreting an invitation or a pause.', 'Offer a simple choice between company and space, then agree on a later check-in if wanted.'],
  },
  4: {
    '01': ['Quick invitations with enough detail', 'Both choices leave room for a quick plan. One needs the practical information before deciding.', 'Send the place, cost, duration, and who is coming with the invitation; let the answer be an easy yes or no.'],
    '02': ['An immediate yes and a few hours of notice', 'A twenty-minute invitation feels workable to one person and rushed to the other.', 'Give a few hours of notice for shared plans; label very short-notice invitations as optional.'],
    '03': ['Spontaneous plans and protected calendar time', 'Your choices sit at opposite ends of the notice preference. Declining a rushed plan would not establish a lack of interest.', 'Schedule the main plan in advance, with spontaneous extras that either person can decline without pressure.'],
    '12': ['Details and preparation time', 'Knowing the plan and having time to adjust the day are separate requirements.', 'Include the details and leave a few hours before the start; ask whether that gives enough preparation time.'],
    '13': ['A clear invitation and a scheduled date', 'One person may accept short notice with enough information; the other wants calendar space protected earlier.', 'Agree the date ahead of time, then confirm the practical details before either person commits money or travel.'],
    '23': ['Different amounts of lead time', 'You both prefer notice over an immediate departure, but “enough notice” may mean hours to one person and an earlier booking to the other.', 'Compare actual notice windows and agree when to suggest and confirm the next shared plan.'],
  },
  5: {
    '01': ['Talking soon and cooling down first', 'One preferred repair starts immediately; the other starts after cooling down. This is a timing difference, not evidence that either person pursues or avoids conflict.', 'Acknowledge the issue now, agree on a pause if needed, and choose a realistic time to return that day.'],
    '02': ['A spoken opening and a written opening', 'A direct conversation and a first message can be different ways to make the same issue easier to approach.', 'Use a short message to name the topic, then agree whether to continue in writing or speak when both are ready.'],
    '03': ['A direct start and a warm reopening', 'One person wants to address the issue straight away; the other prefers humor before discussing it. A warm opening still needs a path to the actual topic.', 'Reconnect briefly if it helps, explicitly name what needs discussing, and check that both are ready to talk.'],
    '12': ['Cooling down and writing first', 'Both choices can create room before a difficult discussion, but one names timing and the other names the format.', 'Agree on a cooling-off window and a short written opening; confirm how you will continue the discussion.'],
    '13': ['A pause and a gentle return', 'Cooling down and reopening warmly can work together. Neither choice specifies every detail of the return.', 'Agree when to reconnect, allow a gentle opening, and reserve time to discuss the issue itself.'],
    '23': ['Written words and humor as doorways', 'Both preferences make the opening easier in different ways. Ask which feels comfortable for this particular conversation.', 'Offer a short message or a warm check-in as the opening, then explicitly invite the real discussion.'],
  },
  6: {
    '01': ['Being able to share and being able to rely', 'Emotional openness and showing up during difficulty overlap, but closeness may need both conversation and practical follow-through.', 'Each name one example of feeling heard and one realistic way to show up when life is difficult.'],
    '02': ['Sharing inner life and making shared stories', 'Talking openly and creating experiences are different sources of closeness. An activity alone may not provide the space one person wants to share.', 'Add a little unhurried conversation to an activity you both want, without requiring a personal disclosure.'],
    '03': ['Openness and acceptance across long gaps', 'One choice emphasizes being able to tell a friend things; the other emphasizes acceptance after time apart. Openness does not have to require constant contact.', 'Agree that a genuine invitation to share remains available after a gap, with an easy way to check capacity first.'],
    '12': ['Support in hard times and shared adventures', 'Being there during difficulty and making memorable experiences show two preferred sides of closeness.', 'Plan one enjoyable activity and separately name what a realistic request for support could look like.'],
    '13': ['Dependability and guilt-free reconnection', 'Showing up when needed can coexist with long ordinary gaps if an important request is easy to identify.', 'Agree how to flag an important need during a quiet period, and make ordinary reconnection free of guilt.'],
    '23': ['Shared experiences and easy returns', 'Memorable time together and feeling accepted after gaps can reinforce each other without requiring a constant stream of plans.', 'Keep a simple shared idea list and make the next invitation easy to accept, postpone, or decline.'],
  },
  7: {
    '01': ['A small signal and a date to look forward to', 'A brief reassurance and a scheduled catch-up answer different parts of a busy month: feeling connected now and knowing when you will meet.', 'Send a small busy-period check-in and choose a tentative catch-up date that can be renegotiated.'],
    '02': ['Reassurance and a natural return', 'One person would feel secure with a small message; the other would prefer to resume without guilt. These are hypothetical needs, not evidence that a month of silence has happened.', 'Agree on a small optional busy signal and make it explicit that resuming contact does not require an apology.'],
    '03': ['A reassuring sign and an honest capacity conversation', 'One preferred response is a small signal; the other is a direct discussion of what contact is realistic.', 'Compare current capacity first, then choose a small reassurance that both can comfortably offer.'],
    '12': ['A catch-up date and flexible reconnection', 'A calendar plan can offer reassurance while a natural return protects flexibility. A date needs room to change without turning into a duty.', 'Choose a provisional catch-up window and a simple way to reschedule without guilt.'],
    '13': ['Scheduling and a capacity check', 'Knowing when you will reconnect and knowing what is realistic can support each other.', 'Talk about available time, then schedule a catch-up at a level both can actually manage.'],
    '23': ['Easy returns and explicit expectations', 'One person is comfortable reconnecting naturally; the other would feel better after comparing what contact is possible.', 'Have a short capacity conversation, then agree whether to leave the return open or choose a check-in window.'],
  },
  8: {
    '01': ['A limited yes and a smaller alternative', 'Both choices protect capacity, with a different starting answer to the request. Neither choice implies more or less care.', 'Name what can be offered now and make a smaller favor, another time, or a kind no equally acceptable.'],
    '02': ['A stated limit and an urgency check', 'One person starts by naming a limit; the other wants to understand urgency before deciding. Knowing urgency does not remove the right to decline.', 'State the deadline and size of the request, then agree what can be offered within an honestly stated limit.'],
    '03': ['A limited offer and time to decide', 'One person may know their limit quickly; the other wants time to assess capacity. A delayed answer is not the same as refusing to help.', 'Include a realistic decision window with the request and treat an initial pause as time to consider, not a yes.'],
    '12': ['A kind no and a discussion of urgency', 'One preference protects capacity through a smaller alternative; the other starts by checking what is urgent.', 'Explain the urgency without using it to pressure a yes, and leave room for a smaller offer or another source of help.'],
    '13': ['An alternative and a considered answer', 'Both choices leave room to avoid an automatic yes. One names a smaller offer; the other needs thinking time first.', 'Say when an answer is needed, allow time to consider, and accept a smaller offer or a no.'],
    '23': ['Deciding together and thinking privately first', 'A joint urgency check and private time to assess capacity are different decision processes. Either can lead to a valid no.', 'Share the request and deadline, allow a pause to assess capacity, then discuss only what each person is willing to offer.'],
  },
};

const sharedActions: Record<number, readonly string[]> = {
  1: ['Choose a comfortable place and time for an unhurried conversation.', 'Pick a new activity together and agree the budget and an easy way to opt out.', 'Choose a group plan and check whether you also want a little one-on-one time.', 'Agree the day-trip outline together, including cost and finish time.'],
  2: ['Check which daily messages are simply for enjoyment and which need a reply.', 'Compare what a meaningful weekly check-in looks like and choose a flexible rhythm.', 'Make ordinary gaps guilt-free and agree how an important message will be flagged.', 'Keep planning messages clear and ask whether either person also wants an occasional personal catch-up.'],
  3: ['Ask before offering advice and give each person room to finish their story.', 'Ask whether ideas are wanted now, then offer one realistic option at a time.', 'Check that humor or an activity is welcome before changing the subject.', 'Ask whether a later check-in is wanted and agree how to signal readiness.'],
  4: ['Keep quick invitations easy to decline and check practical details before leaving.', 'Include place, cost, duration, and who is coming in the invitation.', 'Compare how many hours of notice feel comfortable before suggesting a start time.', 'Choose a date early and agree when to confirm the details.'],
  5: ['Check that both have capacity to talk now; either person can ask for a return time.', 'Agree how to acknowledge a pause and when to return later that day.', 'Use a brief message to name the topic, then decide how to continue.', 'Use warmth to reopen, then make room to discuss the actual issue.'],
  6: ['Offer an invitation to share while making it safe to say “not today.”', 'Each name one realistic way a friend could show up during a difficult week.', 'Choose an experience both want and make room for different budgets and energy.', 'Keep reconnection guilt-free and agree how to flag a genuine need during a long gap.'],
  7: ['Choose a small busy-period signal and leave ordinary messages free of reply pressure.', 'Choose a realistic catch-up date and make rescheduling easy.', 'Agree that a natural return is welcome and decide how an important request will reach you.', 'Compare available time honestly and choose a contact expectation both can manage.'],
  8: ['State the size of a limited offer and make it safe to decline the rest.', 'Make smaller favors and another time welcome without requiring an alternative for every no.', 'Ask about the deadline and urgency, then leave each person free to state capacity.', 'Give a decision window and treat thinking time as neither agreement nor refusal.'],
};

const requests: Record<number, readonly string[]> = {
  1: ['I would enjoy some relaxed one-on-one time.', 'I would enjoy trying something new together.', 'I would enjoy spending time with the group.', 'I would enjoy an outing we plan together.'],
  2: ['Small everyday messages help me feel connected.', 'A few meaningful check-ins work well for me.', 'I like being able to return after a gap without guilt.', 'Messages work best for me when we are making plans.'],
  3: ['Could you listen first when I need to vent?', 'Practical ideas help me when I ask for support.', 'Sometimes company or a distraction helps me first.', 'I sometimes need space before a later check-in.'],
  4: ['I often enjoy a quick invitation.', 'I need the practical details before I can decide.', 'A few hours of notice helps me make room.', 'I need to schedule our plans ahead of time.'],
  5: ['I usually prefer to name an issue soon.', 'A pause helps me settle before we talk.', 'A message can make a difficult topic easier for me to start.', 'A warm reopening helps me get ready to discuss an issue.'],
  6: ['Being able to share honestly helps me feel close.', 'Knowing we can ask for support matters to me.', 'Shared experiences help me feel close.', 'Being accepted after a long gap matters to me.'],
  7: ['A small message would reassure me during a busy stretch.', 'A catch-up date would give me something to look forward to.', 'I would like us to resume naturally without guilt.', 'I would like us to talk honestly about what contact is realistic.'],
  8: ['I can help more comfortably when my limit is clear.', 'I need to be able to say no or offer something smaller.', 'I like to understand the urgency before deciding.', 'I need thinking time before I commit to a favor.'],
};

const observations: Record<number, readonly [progress: string, unresolved: string]> = {
  1: ['You both choose something you actually want, with time and energy limits understood.', 'The plan suits one person only. Adjust the setting or split the activities before committing.'],
  2: ['You can both describe which messages need a reply and what ordinary quiet periods mean.', '“Keep in touch” still means different things. Agree on one example of a check-in and an important message.'],
  3: ['When a relevant moment occurs, the person asking for support can choose the first response.', 'The offer still misses the requested support. Ask whether listening, ideas, distraction, or space would help now.'],
  4: ['The next invitation includes the notice and details you agreed, with an easy option to decline.', 'The invitation still feels rushed or unclear. Adjust the actual notice window or missing details.'],
  5: ['Both understand how to open the topic, pause if needed, and return to discuss it.', 'A pause or warm reopening leaves the topic unfinished. Agree when and how to return.'],
  6: ['Each can name an ordinary action that makes the other feel close, and offer it within capacity.', 'You still assume the same action matters equally to both. Ask for a concrete example from each person.'],
  7: ['You agree how to signal a busy period or resume contact, with no obligation to perform a constant check-in.', 'The reassurance or return still feels vague. Compare what would help and what is realistic to offer.'],
  8: ['A yes, a smaller offer, thinking time, or a no can be stated and accepted without pressure.', 'The request or answer still lacks a deadline or a clear limit. Clarify it before making a commitment.'],
};

export function analyzeFriendAnswers(a: Answers, b: Answers) {
  const choice = (answers: Answers, q: number) => {
    const index = FRIEND_QUESTIONS[q - 1].options.findIndex(o => o.id === answers[q]);
    if (index < 0) throw new Error('A complete set of valid friendship answers is required.');
    return index;
  };
  const rows = FRIEND_QUESTIONS.map(q => {
    const x = choice(a, q.id), y = choice(b, q.id), same = x === y;
    const key = [x, y].sort().join('');
    const guidance = FRIEND_GUIDANCE[q.id - 1];
    const read: PairRead = same
      ? ['A shared preference, with room for context', `You both chose “${q.options[x].label}”. Compare a real example before assuming the same words mean exactly the same thing.`, sharedActions[q.id][x]]
      : pairs[q.id][key];
    // These tiers order useful conversations. They never rate friendship quality.
    const directTiming = (q.id === 2 && key === '02') || (q.id === 3 && ['01', '03'].includes(key)) || (q.id === 4 && key === '03') || (q.id === 5 && ['01', '02'].includes(key)) || (q.id === 7 && key === '02');
    return {
      questionId: q.id, question: q.title, category: q.category, a: q.options[x].label, b: q.options[y].label, same,
      person1Need: guidance.needs[x], person2Need: guidance.needs[y], pairKey: key,
      title: read[0], opportunity: read[1], agreement: read[2], watchFor: guidance.risk,
      conversationStarter: `${read[2]} What would you each change so that it fits?`,
      insight: read[1], priority: same ? 0 : directTiming ? 2 : 1,
      person1Opening: requests[q.id][x], person2Opening: requests[q.id][y],
    };
  });
  const tieOrder = [3, 5, 2, 7, 4, 8, 6, 1];
  const contextualPriority = (row: typeof rows[number]) => {
    if (row.same) return 0;
    if (row.questionId === 2 && !rows[6].same) return 1;
    if (row.questionId === 7 && rows[1].same) return 1;
    if (row.questionId === 3 && !rows[4].same) return 1;
    if (row.questionId === 4 && !rows[0].same) return 1;
    if (row.questionId === 8 && !rows[5].same) return 1;
    return 0;
  };
  const ranked = [...rows].sort((x, y) => (y.priority + contextualPriority(y)) - (x.priority + contextualPriority(x)) || tieOrder.indexOf(x.questionId) - tieOrder.indexOf(y.questionId));
  const differences = ranked.filter(row => !row.same);
  const primary = differences[0] || rows[5];
  const evidence = (ids: number[]) => [...new Set(ids)].map(id => {
    const row = rows[id - 1];
    return { questionId: id, category: row.category, person1: row.a, person2: row.b };
  });
  const findings: { id: string; title: string; interpretation: string; evidence: ReturnType<typeof evidence> }[] = [];
  const add = (condition: boolean, id: string, title: string, interpretation: string, ids: number[]) => {
    if (condition) findings.push({ id, title, interpretation, evidence: evidence(ids) });
  };
  add(!rows[1].same && !rows[6].same, 'contact_and_return', 'Ordinary contact and busy-period reassurance both differ', 'Your everyday texting choices and your preferred busy-period response differ. Compare both situations: an ordinary reply rhythm may not explain what would reassure either person during a longer gap.', [2, 7]);
  add(rows[1].same && !rows[6].same, 'same_rhythm_different_reassurance', 'The same texting rhythm can hide different reassurance needs', 'Your everyday texting answers match, but your answers about a hypothetical busy month do not. Matching contact frequency does not settle how to handle a longer quiet period.', [2, 7]);
  add(!rows[2].same && !rows[4].same, 'support_and_repair', 'A hard day and a disagreement need separate agreements', 'You chose different first responses to a hard day and different openings for repair. Ask what support is wanted, and separately agree how a disagreement could be opened. Neither answer describes what either person has actually done.', [3, 5]);
  add(!rows[0].same && !rows[3].same, 'activity_and_notice', 'The activity and the notice window both matter', 'You differ in the free-day setting and the reaction to a twenty-minute invitation. Choosing the right activity may still need a different notice window to make it comfortable for both.', [1, 4]);
  add(rows[0].same && !rows[3].same, 'same_activity_different_notice', 'Wanting the same activity does not settle when to suggest it', 'Your free-day choices match while your notice preferences differ. Keep the shared activity and compare when to invite and confirm it.', [1, 4]);
  add(!rows[5].same && !rows[7].same, 'closeness_and_capacity', 'Feeling close and protecting capacity can coexist', 'Your sources of closeness and approaches to an overwhelming favor differ. A preference for showing up does not promise unlimited availability; compare one appreciated action and how to ask within capacity.', [6, 8]);
  if (!findings.length) findings.push({ id: 'focus', title: primary.title, interpretation: primary.opportunity, evidence: evidence([primary.questionId]) });
  const selectedFindings = findings.sort((x, y) => Number(y.evidence.some(e => e.questionId === primary.questionId)) - Number(x.evidence.some(e => e.questionId === primary.questionId))).slice(0, 3);
  const decidingCombination = selectedFindings.find(f => f.id !== 'focus' && f.evidence.some(e => e.questionId === primary.questionId));
  const direction = (row: typeof primary, speaker: 1 | 2) => ({
    title: speaker === 1 ? 'Person 1 → Person 2' : 'Person 2 → Person 1',
    when: `For your conversation about ${row.category.toLowerCase()}. Adapt it to your own words.`,
    text: `${speaker === 1 ? row.person1Opening : row.person2Opening} I understand you value ${speaker === 1 ? row.person2Need : row.person1Need}. What would make room for both of us?`,
  });
  const recommendation = {
    questionId: primary.questionId, title: primary.same ? 'Name what makes you feel close' : primary.title,
    reason: primary.same ? 'All eight choices match. Start by comparing concrete examples of closeness; matching preferences do not establish that every need is already met.' : primary.opportunity,
    action: primary.agreement, evidence: decidingCombination?.evidence || evidence([primary.questionId]),
    contextReason: decidingCombination?.interpretation || primary.opportunity,
    progress: observations[primary.questionId][0], unresolved: observations[primary.questionId][1],
    reconsider: 'If a freely stated need or limit is repeatedly dismissed in real interactions, reconsider the arrangement you are willing to continue. A quiz difference alone does not establish that pattern.',
    observe: `Use the next relevant opportunity to try this: ${primary.agreement} If no opportunity occurs, leave the outcome unobserved.`,
    selectionReason: primary.same ? 'No exact differences were selected; closeness provides a concrete starting conversation.' : 'Timing and first-response differences receive priority; related differences across questions also influence the order. If tied, support, repair and contact come first. This is a suggested conversation order, not a measure of relationship quality.',
  };
  const supportWords = ['listening first', 'practical ideas', 'a distraction', 'space and a later check-in'];
  const repairWords = ['a conversation soon', 'time to cool down', 'a written opening', 'a warm reopening'];
  const boundaryWords = ['a clearly limited offer', 'a smaller offer or a kind no', 'an urgency check before deciding', 'time to think before answering'];
  const selectedWords = (q: number, words: string[]) => [...new Set([words[choice(a, q)], words[choice(b, q)]])];
  const supportOptions = selectedWords(3, supportWords).join(' or ');
  const repairOptions = selectedWords(5, repairWords).join(' or ');
  const boundaryOptions = selectedWords(8, boundaryWords).join(' and ');
  const extraMessages: Record<number, string> = {
    3: `If you have a hard day, would ${supportOptions} help first? We can ask again each time instead of assuming.`,
    5: `If something feels off, could we start with ${repairOptions}, then agree when and how to discuss it?`,
    8: `When a favor feels like too much, can we make room for ${boundaryOptions}? Neither of us needs to commit before checking capacity.`,
  };
  const scripts = [direction(primary, 1), direction(primary, 2), ...[rows[2], rows[4], rows[7]].map(row => ({
    title: row.category === 'Support' ? 'Ask before offering support' : row.category === 'Conflict Repair' ? 'Open a repair conversation' : 'Make capacity clear',
    when: row.opportunity,
    text: extraMessages[row.questionId],
  }))];
  const sevenDayPlan = [
    { day: 1, title: 'Compare one real example each', action: `You each selected a preference about ${primary.category.toLowerCase()}. Name an example of what you mean; the quiz has not established that an actual problem occurred.`, question: 'Does the interpretation fit what you meant, or does it need correcting?' },
    { day: 2, title: 'Check what has already been discussed', action: 'If you have already made an agreement about this, compare what followed. Otherwise, each name one thing you would like the other to understand.', question: 'Is the missing piece the request, the meaning, or following through?' },
    { day: 3, title: 'Make room for both voices', action: `${scripts[0].text} Then swap: ${scripts[1].text}`, question: 'Can each person describe what the other actually wants?' },
    { day: 4, title: 'Choose one small shared step', action: recommendation.action, question: 'Is this comfortable, realistic, and freely chosen by both?' },
    { day: 5, title: 'Observe a relevant opportunity', action: recommendation.observe, question: 'What actually happened, and did either person need an adjustment?' },
    { day: 6, title: 'Compare the effect', action: recommendation.progress, question: 'Did the adjustment make this easier for both people, or only one?' },
    { day: 7, title: 'Keep, adjust, or leave it open', action: 'Use the checkpoint below. Keep what helped, adjust what was unclear, or leave it unobserved if no relevant opportunity occurred. There is no required seven-day verdict.', question: 'What is one change we both want to keep?' },
  ];
  const responseGuide = [
    { type: 'green', title: 'Both needs fit a practical agreement', meaning: 'You can describe both preferences and try an arrangement both accept.', action: recommendation.progress },
    { type: 'yellow', title: 'The next step still needs detail', meaning: 'Good intentions leave a practical part of the agreement unclear.', action: recommendation.unresolved },
    { type: 'red', title: 'A stated limit is repeatedly dismissed', meaning: 'This requires evidence from actual interactions; a different quiz answer does not establish it.', action: recommendation.reconsider },
  ];
  return { rows, rankedQuestions: ranked.map(row => row.questionId), differences, findings: selectedFindings, recommendation, scripts, sevenDayPlan, responseGuide,
    checkpoint: [`What actually changed about ${primary.category.toLowerCase()}?`, 'Was there a relevant opportunity, an unclear agreement, or something you both want to change?', 'What is one adjustment that each of you freely wants to keep?'],
    previewSummary: differences.length ? `Your answers highlight ${primary.category.toLowerCase()} as one useful place to compare expectations.` : 'You share all eight selected preferences. The reasons behind them are still worth exploring.',
    method: 'Each answer describes a stated preference, including hypothetical situations. Pair-specific rules interpret the two choices, and a disclosed conversation order selects one first step. It is not a validated compatibility or relationship-quality measure.',
  };
}
