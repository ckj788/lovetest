# Report validation: implementation audit and user research

Status: the software checks below have been run. Human interpretation, usefulness, willingness to pay, and real-world outcomes remain unvalidated. This document prepares a small pilot; it is not evidence of accuracy.

## What is being evaluated

Keep four outcomes separate:

1. **Answer fidelity:** does a statement faithfully represent the selected option? This can be audited against stored selections.
2. **Interpretation fit:** does the person think the explanation fits what they intended? This is participant feedback, not an objective truth about another person.
3. **Usefulness:** can the person name a reasonable action they actually want to try? A later improvement is self-reported and cannot establish causation.
4. **Commercial value:** does the preview explain the paid value, and does the unlocked report feel worth its displayed price? Stated willingness to pay is different from an actual purchase.

The reports do not claim to measure attraction, loyalty, clinical attachment, relationship quality, or probability of staying together. Solo has one person's account; Bestie compares each person's own preferences. Bestie's hypothetical answers do not establish behavior or conflict.

## Completed implementation checks

- Solo: all seven broad types and sixteen recommendation situations have reachable fixtures; unknowns remain visible; explicit contradictions are not erased by positive receipts.
- Bestie: all ten broad types remain reachable; all 128 directed question-pair cases are checked (8 questions × 4 × 4), covering 48 distinct-choice rules and 32 shared-choice cases.
- Bestie: swapping people preserves the shared interpretation and action while swapping individual needs and message openings. Additional deterministic combinations check source quotes and plan linkage.
- Unpaid preview endpoints omit detailed answers, findings, recommendations, scripts and plans. Owner/guest roles and completion/unlock checks remain separate.
- Browser checks and build results are recorded in FIGMA-REVIEW.md after the current implementation is verified.

These checks do not exhaust every full questionnaire combination and do not validate the interpretive rules scientifically.

## Small pilot, ready to run

Use an initial exploratory group of roughly 15–20 Solo participants and 8–10 consenting friend pairs. This is a practical way to find misunderstandings, not a representative sample or a study powered to estimate accuracy. Include varied relationship stages and friend pairs with both similar and different preferences. Do not select only enthusiastic users.

Keep price, report version, question wording and task instructions fixed during a round. Record a version label. Participants should see the free preview before the full report. Do not coach them toward a favorable interpretation, and make skipping a question or withdrawing easy.

Do not request names, raw private conversations, report bearer links, payment details, or other people's identifying information. Bestie feedback should be given independently first; one friend should not answer for the other. Collect only the context participants freely choose to share. No outreach or data collection has been started by this implementation.

### Session prompts

1. Before unlocking: “What do you think this result means? What do you expect the full report to add?”
2. After reading: “Tell me the main conclusion in your own words.” Do not supply the interpretation first.
3. “Which sentence best fits what you meant? Which sentence misunderstands or assumes something you did not tell us?” Record the question/section and the participant's correction.
4. “Which suggested action, if any, would you actually choose? What makes it useful or unsuitable?” Let “none” stand as an answer.
5. “What felt repetitive, too long, confusing, or missing?” Record where they stopped reading.
6. “At the displayed price, what would make this worthwhile or not worthwhile?” Do not treat agreement in an interview as a purchase.
7. For Bestie, ask each person separately: “Did the report distinguish what you prefer from what your friend actually does? Does it assign all the work to one of you?”

### Optional follow-up after a relevant opportunity

Ask only participants who agree to be contacted separately. After about a week, allow “no relevant opportunity” and “did not want to try it” as complete answers:

- Did you choose an action? Which one, or why not?
- Did an opportunity actually occur? If so, describe the adjustment without identifying another person.
- Was the suggestion helpful, unhelpful, or mixed? What would you change?
- For Bestie: did each of you freely choose the adjustment? Ask each person independently.

A seven-day observation does not establish lasting benefit or causation. Do not turn missing opportunities into unsuccessful outcomes.

## Recording template

Use one record per participant (two independent records per Bestie pair):

- Anonymous session ID / optional pair ID:
- Report version / mode / broad type / recommended topic:
- Read free preview before full report: yes / no
- Expected paid value in the participant's own words:
- Main conclusion understood in their own words:
- Misread or unsupported sentence, section, and correction:
- Chosen action: specific step / none / unsure
- Reason it fits or does not fit:
- Repetition or stopping point:
- Price feedback: actual purchase / stated intent / would not buy / unsure
- Follow-up consent: yes / no
- Follow-up opportunity: occurred / did not occur / declined action / no response
- Reported usefulness and any unwanted effect:

## How to decide what to change

Review every fabricated-history or unsupported-intention complaint individually. Fix wording or logic before presenting the affected situation as reliable. Do not dismiss a misunderstanding because a majority liked the report.

Report participant counts alongside feedback: for example, “4 of 18 flagged a repeated paragraph.” Keep Solo and Bestie results separate, and keep each friend's feedback separate. State the number who had a relevant follow-up opportunity. Do not publish a single “accuracy percentage” by combining liking, interpretation fit and outcomes.

After revision, run a new round with new participants and the same neutral prompts. A larger study with independent reviewers and defined external criteria would be needed for stronger validity claims. The current product should continue to describe its output as an interpretation of self-reported answers.
