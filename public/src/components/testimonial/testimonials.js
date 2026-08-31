const TESTIMONIALS = [
    {
        quote: "I really enjoyed STEM class. It taught me how to use Scratch, and I learned how to make games with it.",
        author: "Student",
        current: true
    },
    {
        quote: "I'm the father of two third graders who has been attending STEM club for the last year. They come home excited and tell me all about what they did today in class. Its great seeming them this excited for something school related.",
        author: "Parent",
        current: false
    },
    {
        quote: "[Place Holder]...",
        author: "Volunteer",
        current: false
    },
    {
        quote: "[Place Holder]",
        author: "Teacher",
        current: false
    },
    {
        quote: "[Place Holder]",
        author: "Community Member",
        current: false
    }
];

function renderTestimonials() {
    const ratings = UI.element("div", { class: "ratings" });

    TESTIMONIALS.forEach((testimonial) => {
        UI.add(ratings, UI.component("quote", testimonial));
    });

    return ratings;
}
