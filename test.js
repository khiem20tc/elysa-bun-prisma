const solc = require('solc');

// Solidity source code
const sourceCode = "";

// Compile the Solidity code
const compiledCode = solc.compile(sourceCode, 1);

// Get the AST from the compiled code
const ast = JSON.parse(compiledCode.contracts[':YourContractName'].ast);

// Function to recursively traverse the AST
function findTransferEvents(node) {
    if (node.nodeType === 'FunctionDefinition') {
        // Check if the function contains the 'Transfer' event
        const containsTransferEvent = node.body.statements.some(statement =>
            statement.nodeType === 'EmitStatement' &&
            statement.eventCall.expression.name === 'Transfer'
        );

        if (containsTransferEvent) {
            console.log('Function with Transfer event:', node.name);
        }
    }

    if (node.children) {
        node.children.forEach(child => findTransferEvents(child));
    }
}

// Start traversing the AST
findTransferEvents(ast);
