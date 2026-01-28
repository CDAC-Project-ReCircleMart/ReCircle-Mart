# Product Approval System Implementation

## Overview

Implemented a complete product approval/moderation system where:

- New listings are created with **pending** status by default
- Only **approved** listings appear on the home page
- Admins can approve, reject, or change status of any listing from the Manage Listings page
- Pending and rejected listings are hidden from public view

---

## Backend Changes

### 1. Database Schema Update

**File:** `Final-Backend/database.sql`

Added status column to listings table:

```sql
CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  price INT,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  location TEXT,
  year INT,
  description TEXT,
  seller_id INT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Migration SQL (if needed):**

```sql
ALTER TABLE listings ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending';
```

---

### 2. Listing Controller Updates

**File:** `Final-Backend/controllers/listingController.js`

#### A. Create Listing - Set Default Status

```javascript
exports.createListing = async (req, res) => {
  try {
    const { title, price, category, subcategory, location, year, description } =
      req.body;

    const sellerId = req.user.id;
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const [result] = await db.query(
      `INSERT INTO listings
      (title, price, category, subcategory, location, year, description, seller_id, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        title,
        price,
        category,
        subcategory,
        location,
        year,
        description,
        sellerId,
      ],
    );
    // ... rest of function
  }
};
```

#### B. Get All Listings - Filter by Approved Status

```javascript
exports.getAllListings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT l.*, 
      (SELECT image_path FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
      FROM listings l
      WHERE l.status = 'approved'
      ORDER BY l.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Get listings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};
```

---

### 3. Admin Controller - New Update Status Function

**File:** `Final-Backend/controllers/adminController.js`

```javascript
/* ===================== UPDATE LISTING STATUS ===================== */

exports.updateListingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await db.query("UPDATE listings SET status = ? WHERE id = ?", [status, id]);

    res.json({ message: `Listing ${status} successfully` });
  } catch (err) {
    console.error("❌ ADMIN UPDATE LISTING STATUS ERROR:", err);
    res.status(500).json({ message: "Failed to update listing status" });
  }
};
```

---

### 4. Admin Routes - New Status Update Endpoint

**File:** `Final-Backend/routes/adminRoutes.js`

```javascript
/* ===================== LISTINGS MANAGEMENT ===================== */

// 🔹 GET ALL LISTINGS
router.get("/listings", auth, admin, adminController.getAllListings);

// 🔹 UPDATE LISTING STATUS
router.put(
  "/listings/:id/status",
  auth,
  admin,
  adminController.updateListingStatus,
);

// 🔹 DELETE LISTING
router.delete("/listings/:id", auth, admin, adminController.deleteListing);

module.exports = router;
```

---

## Frontend Changes

### 1. Admin API Service

**File:** `Final Frontend/src/services/adminApi.js`

```javascript
/* LISTINGS */
export const getListings = () => api.get("/admin/listings");

export const updateListingStatus = (id, status) =>
  api.put(`/admin/listings/${id}/status`, { status });

export const deleteListing = (id) => api.delete(`/admin/listings/${id}`);
```

---

### 2. Manage Listings Page - Complete Updates

**File:** `Final Frontend/src/pages/admin/ManageListings.jsx`

#### A. Updated Imports

```javascript
import {
  getListings,
  deleteListing,
  updateListingStatus, // NEW
} from "../../services/adminApi";
```

#### B. Add Status Change Handler

```javascript
/* ================= UPDATE STATUS ================= */
const handleStatusChange = async (id, newStatus) => {
  try {
    await updateListingStatus(id, newStatus);
    toast.success(`Listing ${newStatus} successfully`);
    setAllListings(
      allListings.map((l) => (l.id === id ? { ...l, status: newStatus } : l)),
    );
  } catch (err) {
    toast.error("Failed to update status");
    console.error("STATUS UPDATE ERROR:", err);
  }
};
```

#### C. Updated Table Structure

- Added **Status** column (between Price and Action)
- Added status dropdown with three options: Pending, Approved, Rejected
- Color-coded dropdown borders based on status
- Updated table colspan from 8 to 9

```javascript
<table>
  <thead>
    <tr>
      <th>Image</th>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Seller</th>
      <th>Date Added</th>
      <th>Price</th>
      <th>Status</th> {/* NEW */}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {/* In table rows */}
    <td>
      <select
        className="status-dropdown"
        value={item.status || "pending"}
        onChange={(e) => handleStatusChange(item.id, e.target.value)}
        style={{
          borderColor: statusColor[item.status || "pending"],
        }}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </td>
  </tbody>
</table>
```

---

### 3. Manage Listings CSS - Status Dropdown Styling

**File:** `Final Frontend/src/pages/admin/ManageListings.css`

```css
/* ================= STATUS DROPDOWN ================= */

.status-dropdown {
  padding: 6px 10px;
  border-radius: 6px;
  border: 2px solid #d1d5db;
  font-size: 12px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.status-dropdown:hover {
  border-color: #9ca3af;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.status-dropdown:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.status-dropdown option[value="pending"] {
  color: #f59e0b; /* Amber */
}

.status-dropdown option[value="approved"] {
  color: #22c55e; /* Green */
}

.status-dropdown option[value="rejected"] {
  color: #ef4444; /* Red */
}
```

---

### 4. Home Page - Filter Comment Update

**File:** `Final Frontend/src/pages/Home/Home.jsx`

Updated comment to clarify that backend filters by approved status:

```javascript
// 🔴 FETCH LISTINGS (ONLY APPROVED) - Backend filters by status='approved'
useEffect(() => {
  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/listings");
      // Only approved listings are returned by backend
      setAllListings(res.data);

      const shuffled = [...res.data].sort(() => 0.5 - Math.random());
      setFilteredListings(shuffled);
    } catch {
      toast.error("Failed to load listings from server");
    } finally {
      setLoading(false);
    }
  };

  fetchListings();
}, []);
```

---

## API Endpoints

### New Endpoint

**PUT /admin/listings/:id/status**

- **Authentication:** Required (Bearer token)
- **Authorization:** Admin only
- **Request Body:** `{ status: "pending" | "approved" | "rejected" }`
- **Response:** `{ message: "Listing {status} successfully" }`
- **Status Codes:**
  - 200: Success
  - 400: Invalid status value
  - 403: Not authorized
  - 500: Server error

### Modified Endpoints

**GET /api/listings**

- Now returns only **approved** listings
- Excludes pending and rejected listings from public view

**POST /api/listings**

- New listings automatically set to **pending** status
- Hidden from public until admin approves

---

## User Workflow

### For Sellers (Product Creation)

1. Seller posts a new product
2. Product is created with status: **pending**
3. Product is NOT visible on home page
4. Seller must wait for admin approval

### For Admins (Moderation)

1. Admin navigates to Manage Listings page
2. Sees all listings with their current status
3. Can see dropdown next to each listing with three options:
   - **Pending** (amber/yellow border)
   - **Approved** (green border) - Makes product visible on home
   - **Rejected** (red border) - Hides product from home
4. Can change status anytime by selecting from dropdown
5. Status change happens immediately with success toast

### For Buyers (Home Page)

1. See only approved products on home page
2. Cannot see pending or rejected products
3. All products are fully approved and safe

---

## Features & Benefits

✅ **Moderation System**

- Admins have full control over product visibility
- Prevent inappropriate listings from being seen

✅ **Three-Status System**

- Pending: Awaiting admin review
- Approved: Visible to public
- Rejected: Hidden from public (can be re-submitted by seller)

✅ **Real-time Updates**

- Status changes apply immediately
- No page refresh needed

✅ **Visual Feedback**

- Color-coded borders on dropdowns
- Toast notifications on success/failure
- Clear status indication in admin panel

✅ **No Impact on Other Pages**

- Other admin pages unchanged
- User profile pages unchanged
- Chat and favorites unaffected

---

## Database Migration Steps

If upgrading existing database:

```sql
-- Add status column if it doesn't exist
ALTER TABLE listings ADD COLUMN status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending';

-- Set all existing listings to approved (optional - be careful!)
-- Only do this if you want existing products to remain visible
-- UPDATE listings SET status = 'approved';
```

---

## Testing Checklist

**Backend:**

- [ ] Verify new column exists in database
- [ ] Create a new listing - verify status is 'pending'
- [ ] GET /listings returns only approved products
- [ ] PUT /admin/listings/:id/status updates status correctly
- [ ] Status validation works (only accepts: pending, approved, rejected)

**Frontend:**

- [ ] Navigate to Manage Listings page
- [ ] All listings show with status column
- [ ] Dropdown shows three options
- [ ] Changing status updates immediately
- [ ] Toast notification appears on status change
- [ ] New listings don't appear on home page (pending)
- [ ] Approved listings appear on home page
- [ ] Rejected listings don't appear on home page

---

## Error Handling

The system includes error handling for:

- Invalid status values (returns 400)
- Database errors (returns 500)
- Unauthorized access (returns 403)
- Failed API requests (shows toast error message)

---

## Future Enhancements (Optional)

- Add bulk status actions (approve/reject multiple)
- Add status filter in Manage Listings (show pending only, etc.)
- Add rejection reason/comment
- Email notifications to sellers on approval/rejection
- Automatic expiration after certain days if pending
- Status change history/audit log
