export const factGenerator = () => {
    const randomFact = [
        "A dog’s nose print is unique, much like a person’s fingerprint.",
        "Dogs’ noses can sense heat/thermal radiation, which explains why blind or deaf dogs can still hunt.",
        "Yawning is contagious—even for dogs. Research shows that the sound of a human yawn can trigger one from your dog.",
        "Dogs are not colorblind. They can see blue and yellow.",
        "The Bloodhound’s sense of smell is so accurate that the results of its tracking can be used as evidence in a court of law.",
        "House cats share 95.6% of their genetic makeup with tigers.",
        "The oldest cat to ever live was Creme Puff, who lived to be 38 years and 3 days old.",
        "Cats have a whopping 32 muscles in each of their ears, allowing them to swivel their ears to hone in on the exact source of a noise.",
        "Abraham Lincoln, the 16th President of the United States, absolutely loved cats and would play with them for hours. He owned several cats during this time in the White House",
        "Cats usually sleep around an average of 15 hours per day. This means that a cat spends roughly 70% of their lives sleeping.",
        "In Ancient Egypt, members of a family would shave their eyebrows in mourning if their cat died."
    ];

    const random = Math.floor(Math.random() * randomFact.length);
    const answer = randomFact[random]
    return (`${answer}`)
}