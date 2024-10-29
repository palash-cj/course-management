# Course Management

This is a backend API built with [NestJS](https://nestjs.com/) and [MongoDB](https://www.mongodb.com/) to manage categories, subcategories, and courses. The API includes CRUD operations for categories, subcategories, and courses, and a custom endpoint to retrieve subcategory counts.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or hosted)
- NestJS CLI (optional but recommended): `npm install -g @nestjs/cli`

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/palash-cj/course-management.git
   cd course-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file at the root of the project and add the following:

   ```env
   MONGO_URI
   ```

4. **Run the application:**

   ```bash
   npm run start:dev
   ```

   The server will run at `http://localhost:3000`.

## API Endpoints

### 1. **Categories**

#### Create Category

- **Endpoint:** `POST /categories`
- **Description:** Creates a new category.
- **Body:**

  ```json
  {
    "name": "Category Name"
  }
  ```

#### Update Category

- **Endpoint:** `PUT /categories/:id`
- **Description:** Updates an existing category by its ID.
- **Params:**
  - `id` (string): Category ID
- **Body:**

  ```json
  {
    "name": "Updated Category Name"
  }
  ```

#### Delete Category

- **Endpoint:** `DELETE /categories/:id`
- **Description:** Deletes a category by its ID.
- **Params:**
  - `id` (string): Category ID

#### Get All Categories

- **Endpoint:** `GET /categories`
- **Description:** Fetches all categories with their subcategories populated.

#### Get Category with Subcategory Count

- **Endpoint:** `GET /categories/subcategory-count`
- **Description:** Lists all categories along with a count of subcategories for each category.
- **Response Example:**

  ```json
  [
    {
      "name": "Category 1",
      "subCategoryCount": 20
    },
    {
      "name": "Category 2",
      "subCategoryCount": 5
    }
  ]
  ```

### 2. **Subcategories**

#### Create Subcategory

- **Endpoint:** `POST /subcategories`
- **Description:** Creates a new subcategory and assigns it to a category.
- **Body:**

  ```json
  {
    "name": "Subcategory Name",
    "categoryId": "Category_ID"
  }
  ```

#### Update Subcategory

- **Endpoint:** `PUT /subcategories/:id`
- **Description:** Updates an existing subcategory by its ID.
- **Params:**
  - `id` (string): Subcategory ID
- **Body:**

  ```json
  {
    "name": "Updated Subcategory Name",
    "categoryId": "Updated_Category_ID"
  }
  ```

#### Delete Subcategory

- **Endpoint:** `DELETE /subcategories/:id`
- **Description:** Deletes a subcategory by its ID.
- **Params:**
  - `id` (string): Subcategory ID

#### Get All Subcategories

- **Endpoint:** `GET /subcategories`
- **Description:** Fetches all subcategories.

### 3. **Courses**

#### Create Course

- **Endpoint:** `POST /courses`
- **Description:** Creates a new course and assigns categories and subcategories.
- **Body:**

  ```json
  {
    "name": "Course Name",
    "categories": ["Category_ID1", "Category_ID2"],
    "subCategories": ["SubCategory_ID1", "SubCategory_ID2"]
  }
  ```

#### Update Course

- **Endpoint:** `PUT /courses/:id`
- **Description:** Updates an existing course by its ID.
- **Params:**
  - `id` (string): Course ID
- **Body:**

  ```json
  {
    "name": "Updated Course Name",
    "categories": ["Updated_Category_ID"],
    "subCategories": ["Updated_SubCategory_ID"]
  }
  ```

#### Delete Course

- **Endpoint:** `DELETE /courses/:id`
- **Description:** Deletes a course by its ID.
- **Params:**
  - `id` (string): Course ID

#### Get All Courses

- **Endpoint:** `GET /courses`
- **Description:** Fetches all courses with their categories and subcategories populated.

## Validation

Input validation is applied for creating and updating categories and subcategories using NestJS's `class-validator` and `class-transformer`.

---
