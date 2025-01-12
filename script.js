document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Fetch and display products when the page loads

    // Adding event listener for the product form
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting normally
        const productName = document.getElementById('productName').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;
        addProduct(productName, quantity, price); // Add the product to the list
    });
});

// Fetch products from the backend
function fetchProducts() {
    fetch('http://localhost:8080/api/products') // Correct the URL to match the backend controller's path
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Converts the response to JSON
        })
        .then(products => {
            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = ''; // Clear existing product list

            // Loop through each product and create table rows
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.productName}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>${(product.quantity * product.price).toFixed(2)}</td>
                `;
                productTableBody.appendChild(row); // Append each row to the table body
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error); // Handle errors
            alert('There was an error fetching the products.');
        });
}

// Add new product to the database
function addProduct(productName, quantity, price) {
    fetch('http://localhost:8080/api/products', { // Correct the URL to match the backend controller's path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productName: productName,
            quantity: parseInt(quantity), // Ensure quantity is an integer
            price: parseFloat(price)      // Ensure price is a float
        }) // Sends product name, quantity, and price as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add the product');
        }
        return response.json(); // Converts the response to JSON
    })
    .then(product => {
        alert('Product added successfully!'); // Notify user of the successful product addition
        fetchProducts(); // Refresh product list after adding the new product
    })
    .catch(error => {
        console.error('Error adding product:', error); // Handle errors
        alert('There was an error adding the product.');
    });
}
