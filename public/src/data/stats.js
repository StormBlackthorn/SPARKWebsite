const STATS = {
    studentsTaught: {
        icon: "styles/assets/icons/studentsTaught.png",
        value: "500+",
        label: "Students Taught"
    },
    fundsRaised: {
        icon: "styles/assets/icons/fundsRaised.png",
        value: "$7800",
        label: "Saved Compared to Alternatives"
    },
    yearsOfService: {
        icon: "styles/assets/icons/yearsOfService.png",
        value: "3",
        label: "Years of Continuous Service"
    },
    volunteerTeachers: {
        icon: "styles/assets/icons/dedicatedVolunteerTeachers.png",
        value: "80",
        label: "Dedicated Volunteer Teachers"
    },
    hoursContributed: {
        icon: "styles/assets/icons/hoursContributed.png",
        value: "700+",
        label: "Hours Contributed"
    },
    schools: {
        icon: "styles/assets/icons/schools.png",
        value: "30",
        label: "Schools"
    },
    countries: {
        icon: "styles/assets/icons/globe.png",
        value: "5",
        label: "Countries"
    },
    enjoyment: {
        icon: "styles/assets/icons/enjoyment.png",
        value: "9.8",
        label: "Enjoyment"
    },
    educationalValue: {
        icon: "styles/assets/icons/educationalValue.png",
        value: "9.4",
        label: "Educational Value"
    },
    teacherHelpfulness: {
        icon: "styles/assets/icons/teacherHelpfulness.png",
        value: "9.5",
        label: "Teacher Helpfulness"
    }
};

const STAT_SECTIONS = [
    {
        items: ["studentsTaught", "fundsRaised", "yearsOfService"]
    },
    {
        label: "Made Possible By...",
        items: ["volunteerTeachers", "hoursContributed"]
    },
    {
        label: "Across...",
        items: ["schools", "countries"]
    },
    {
        label: "With an Average Rating of...*",
        footnote: "*The ratings are given on a ten point scale, given by the kids and the kids only.",
        items: ["enjoyment", "educationalValue", "teacherHelpfulness"]
    }
];

const HOME_STATS = ["studentsTaught", "volunteerTeachers", "schools", "hoursContributed"];
