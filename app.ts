#!/usr/bin/env node

import inquirer from "inquirer";

let myBalance = 50000;
const pinNum = 1122;

async function atm() {
    let pinEntered = await inquirer.prompt([
        {
            name: "pin",
            message: "Enter Your Pin Number",
            type: "number",
        }
    ]);

    if (pinEntered.pin === pinNum) {
        let atmQuestion = await inquirer.prompt([
            {
                name: 'accountType',
                type: 'list',
                message: 'Select Your Account Type',
                choices: ['Current', 'Saving'],
            },
            {
                name: "transMethod",
                message: "Please Select Your Transaction Method",
                type: "list",
                choices: ["Cash Withdraw", "Fast Cash"],
            }
        ]);

        if (atmQuestion.transMethod === "Cash Withdraw") {
            let amount = await inquirer.prompt([
                {
                    name: "withdrawAmount",
                    message: "Enter the amount to withdraw",
                    type: "number",
                }
            ]);

            if (amount.withdrawAmount <= myBalance) {
                myBalance -= amount.withdrawAmount;
                console.log(`Transaction successful. Your new balance is ${myBalance}`);
            } else {
                console.log("Insufficient balance.");
            }
        } else if (atmQuestion.transMethod === "Fast Cash") {
            let fastCashAmounts = [1000, 2000, 5000];
            let fastCash = await inquirer.prompt([
                {
                    name: "fastCashAmount",
                    message: "Select Fast Cash Amount",
                    type: "list",
                    choices: fastCashAmounts,
                }
            ]);

            if (fastCash.fastCashAmount <= myBalance) {
                myBalance -= fastCash.fastCashAmount;
                console.log(`Transaction successful. Your Availble balance is ${myBalance}`);
            } else {
                console.log("Insufficient balance.");
            }
        }
    } else {
        console.log("Invalid PIN. Please try again.");
    }
}

atm();

