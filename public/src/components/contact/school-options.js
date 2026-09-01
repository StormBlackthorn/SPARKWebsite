const GENERAL_INQUIRY = "General Inquiry (Not School Specific)";

function renderSchoolSelect() {
    return renderDropdown({
        id: "school",
        name: "school",
        required: true,
        options: [
            {
                value: GENERAL_INQUIRY,
                label: GENERAL_INQUIRY,
                selected: true
            },
            ...CHAPTERS.map((chapter) => {
                const label = `${chapter.school} School`;
                return { value: label, label };
            })
        ]
    });
}
