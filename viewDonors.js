const donorList = document.querySelector("div.donorList") // Find the donorList div in our html
let tableHeaders = ["Donor ID", "Blood Type", "Iron Count", "Weight", "Age"]
const createDonorTable = () => {
        while (donorList.firstChild) donorList.removeChild(donorList.firstChild) // Remove all children from donorList div (if any)
        let donorTable = document.createElement('table') // Create the table itself
        donorTable.className = 'donorTable'
        let donorTableHead = document.createElement('thead') // Creates the table header group element
        donorTableHead.className = 'donorTableHead'
        let donorTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
        donorTableHeaderRow.className = 'donorTableHeaderRow'
            // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
        tableHeaders.forEach(header => {
            let donorHeader = document.createElement('th') // Creates the current header cell during a specific iteration
            donorHeader.innerText = header
            donorTableHeaderRow.append(donorHeader) // Appends the current header cell to the header row
        })
        donorTableHead.append(donorTableHeaderRow) // Appends the header row to the table header group element
        donorTable.append(donorTableHead)
        let donorTableBody = document.createElement('tbody') // Creates the table body group element
        donorTableBody.className = "donorTable-Body"
        donorTable.append(donorTableBody) // Appends the table body group element to the table
        donorList.append(donorTable) // Appends the table to the donorList div
    }
    // The function below will accept a single score and its index to create the global ranking
const appendDonorInfo = (donorList_json) => { // Accepts the json object from the database to display as table row
        const donorListTable = document.querySelector('.donorTable') // Find the table we created
        let tableBodyRow = document.createElement('tr') // Create the current table row
        tableBodyRow.className = 'tableBodyRow'
            // Lines 72-85 create the 5 column cells that will be appended to the current table row
        let donor_id = document.createElement('td')
            // Takes the donor id from the sql output to populate the table column
        donor_id.innerText = donorList_json.donor_id // I think this is something like `json.tableName.varName`
        let blood_type = document.createElement('td')
        blood_type.innerText = donorList_json.blood_type // I think this is something like `json.tableName.varName`
        let rh_factor = document.createElement('td')
        rh_factor.innerText = donorList_json.rh // I think this is something like `json.tableName.varName`
        let iron_count = document.createElement('td')
        iron_count.innerText = donorList_json.iron_count // I think this is something like `json.tableName.varName`
        let weight = document.createElement('td')
        weight.innerText = donorList_json.weight // I think this is something like `json.tableName.varName`
        let age = document.createElement('td')
        age.innerText = donorList_json.age // I think this is something like `json.tableName.varName`
        tableBodyRow.append(donor_id, blood_type, rh_factor, iron_count, weight, age) // Append all 6 cells to the table row
        donorListTable.append(tableBodyRow) // Append the current row to the scoreboard table body
    }
    // All this needs to be changed to be able to connect to the db as needed
const getScores = () => {
    fetch('http://localhost:3000/scores') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
        .then(res => res.json())
        .then(scores => {
            createScoreboardTable() // Clears scoreboard div if it has any children nodes, creates & appends the table
                // Iterates through all the objects in the scores array and appends each one to the table body
            for (const score of scores) {
                let scoreIndex = scores.indexOf(score) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
                appendScores(score, scoreIndex) // Creates and appends each row to the table body
            }
        })
}