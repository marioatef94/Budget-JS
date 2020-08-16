// Budget Object
function Budget(name,value,income,expenses,expensesPrecentage){
    this.name = name;
    this.value = value;
    this.income = income;
    this.expenses = expenses;
    this.expensesPrecentage = expensesPrecentage;
}

// Global Variables
var budgetList = [];
var totalOfTotal = 0;
var totalOfExpensesPrecentage =0;

var incomeDiv = document.getElementById('incomeList');
var expensesDiv = document.getElementById('expensesList');
var totalOfTotalLabel = document.getElementById('totalOfTotal');
var totalExpensesLabel = document.getElementById('totalExpenses');
var totalExpensesPrecentageLabel = document.getElementById('totalExpensesPrecentage');
var totalIncomeLabel = document.getElementById('totalIncome');
var totalExpenses = 0;
var totalExpensesPrecentage =0;
var totalIncome = 0;


// Self Invoke Function
(function(){
    if(localStorage.getItem('budgetList')==null){budgetList = [];}
    else{budgetList = JSON.parse(localStorage.getItem('budgetList')); displayBudget(budgetList); totalCost(budgetList);}

 
})();

// Add Button
var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',click);
// Main Function For Add Button
function click()
{
    saveBudget();
    displayBudget(budgetList);
}

// Save Budget in Local Storage
function saveBudget()
{
    var list = [];
    var budgetName = document.getElementById('budgetName').value;
    var budgetValue = Number(document.getElementById('budgetValue').value);
    
    if (budgetValue > 0){
        var $income = budgetValue; 
    }
    else if(budgetValue < 0)
    {
        var $expenses = budgetValue;
       
    }

    var budget = new Budget(budgetName,budgetValue,$income,$expenses);
    budgetList.push(budget);
    list.push(budget);
    localStorage.setItem('budgetList',JSON.stringify(budgetList));

    totalCost(list);
   
}

// Display Budgets
function displayBudget(list)
{
    var inDiv ='';
    var exDiv = '';
    if(list.length > 0)
    {
        for (var i=0;i<list.length;i++)
        {
            if (list[i].income != undefined)
            {
                inDiv += `<div class='item clearfix'>
                                <div class='item__description'>${list[i].name}</div>
                                <div class='right clearfix'>
                                <div class='item__value'>+ ${list[i].income}</div>
                                <div class='item__delete'>
                                <button onclick='deleteBudget(${i})' class='item__delete--btn'><i class='ion-ios-close-outline'></i></button>
                                </div></div></div>`;
            }
            else{
                exDiv += `<div class='item clearfix'>
                                        <div class='item__description'>${list[i].name}</div>
                                        <div class='right clearfix'>
                                        <div class='item__value'>${list[i].expenses}</div>
                                        <div class='item__delete'>
                                        <button onclick='deleteBudget(${i})' class='item__delete--btn'><i class='ion-ios-close-outline'></i></button>
                                        </div></div></div>`;
            }

            incomeDiv.innerHTML = inDiv;
            expensesDiv.innerHTML = exDiv;
        }
    }
    else{
        incomeDiv.innerHTML = '';
        expensesDiv.innerHTML = '';
    }
}

// Delete Specific Budget
function deleteBudget(i)
{
    budgetList.splice(i,1);
    localStorage.setItem('budgetList',JSON.stringify(budgetList));
    var list = JSON.parse(localStorage.getItem('budgetList'));
    clearAll();
    totalCost(list);
    displayBudget(list);

}

// Calculate Total Cost
function totalCost(list)
{

        for(var i=0;i<list.length;i++)
        {   
            if(list[i].income != undefined){totalIncome += list[i].income;}
            else{ totalExpenses += list[i].expenses; }
        }
        totalIncomeLabel.innerHTML = totalIncome ;
        totalExpensesLabel.innerHTML = totalExpenses;
        totalExpensesPrecentage = ((-totalExpenses / totalIncome)*100).toPrecision(3);
        totalExpensesPrecentageLabel.innerHTML = ` ${(totalExpensesPrecentage)}% `;
        totalOfTotal = (totalIncome + totalExpenses);
        if(totalOfTotal >=0)
        {
            totalOfTotalLabel.innerHTML = ` + ${totalOfTotal}`;
        }
        else
        {
            totalOfTotalLabel.innerHTML = `${totalOfTotal}`;
        }
    }


// Clear All Budgets
document.getElementById('clearBtn').addEventListener('click',deleteAll);
function clearAll()
{
    
    totalExpenses = 0;
    totalExpensesPrecentage =0;
    totalIncome = 0;
    totalOfTotal = 0;
    totalOfExpensesPrecentage =0;
    totalOfTotalLabel.innerHTML = "+ 0";
    totalIncomeLabel.innerHTML="0";
    totalExpensesLabel.innerHTML = "0";
    totalExpensesPrecentageLabel.innerHTML = '0.00%';
}


function deleteAll()
{
    localStorage.removeItem('budgetList');
    clearAll();
    budgetList=[];
    displayBudget(budgetList);
}












