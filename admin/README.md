1. Structure & Layout

Navbar (top)

Brand logo/name on the left

Clerk login/logout or profile button on the right

Sidebar (left)

Navigation links:

Dashboard (optional summary)

Cakes (List.jsx)

Add Cake (Add.jsx)

Orders (Orders.jsx)

Highlight active page

Collapsible/expandable for better UX

Main Content (right)

Displays the selected page (Add, List, Orders) using React Router

Toast notifications integrated

Responsive layout

Sidebar collapses on smaller screens

Main content expands

2. Backend Integration

Cakes

Add page → POST /api/food/add → saves to backend

List page → GET /api/food/list → fetch all cakes

Delete cake → POST /api/food/remove

Orders

GET /api/order/list → fetch all orders

POST /api/order/status → update status

Images

Upload handled with <input type="file" /> → backend saves image and returns path

Display image using <img src={${url}/images/${imageName}} />

3. Features & Improvements

Add Cake

Form validation for required fields

Image preview before upload

Success/error toasts

Reset form after submission

List

Fetch from backend dynamically

Delete cake functionality

Display image, name, category, price

Orders

Fetch orders dynamically

Display all order details: items, customer info, address, amount

Update status in dropdown

Admin Panel UX

Flex layout with Navbar + Sidebar + Main content

Sticky Navbar

Hover and active states on sidebar links

Clean and modern color palette (brand colors)

Optional: search/filter for cakes and orders



src/
├─ assets/
│  ├─ assets.js        # icons, placeholder images
│  └─ cakesData.js     # initial cakes if needed
├─ Components/
│  ├─ Navbar/
│  │  ├─ Navbar.jsx
│  │  └─ Navbar.css
│  ├─ Sidebar/
│  │  ├─ Sidebar.jsx
│  │  └─ Sidebar.css
│  ├─ CakesTable/
│  │  ├─ CakesTable.jsx
│  │  └─ CakesTable.css
├─ Pages/
│  ├─ Add/
│  │  ├─ Add.jsx
│  │  └─ Add.css
│  ├─ List/
│  │  ├─ List.jsx
│  │  └─ List.css
│  ├─ Orders/
│  │  ├─ Orders.jsx
│  │  └─ Orders.css
├─ App.jsx
└─ index.jsx
