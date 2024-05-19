#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
let myBalance = 50000;
const pinNum = 1122;
function atm() {
    return __awaiter(this, void 0, void 0, function* () {
        let pinEntered = yield inquirer_1.default.prompt([
            {
                name: "pin",
                message: "Enter Your Pin Number",
                type: "number",
            }
        ]);
        if (pinEntered.pin === pinNum) {
            let atmQuestion = yield inquirer_1.default.prompt([
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
                let amount = yield inquirer_1.default.prompt([
                    {
                        name: "withdrawAmount",
                        message: "Enter the amount to withdraw",
                        type: "number",
                    }
                ]);
                if (amount.withdrawAmount <= myBalance) {
                    myBalance -= amount.withdrawAmount;
                    console.log(`Transaction successful. Your new balance is ${myBalance}`);
                }
                else {
                    console.log("Insufficient balance.");
                }
            }
            else if (atmQuestion.transMethod === "Fast Cash") {
                let fastCashAmounts = [1000, 2000, 5000];
                let fastCash = yield inquirer_1.default.prompt([
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
                }
                else {
                    console.log("Insufficient balance.");
                }
            }
        }
        else {
            console.log("Invalid PIN. Please try again.");
        }
    });
}
atm();
