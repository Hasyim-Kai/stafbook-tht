# INSTALLATION

0. run `npm i`
1. run `npm run build`
2. Ensure BE is running
3. run `npm run preview`
4. visit `http://localhost:4173/auth/signin`


#### Link route

```
├── http://localhost:4173/          # Base API route for the application
│   ├── product/                    # Product base route
│       ├── /                       # GET: Get the product initial page
│       └── create                  # POST: create a product with it's category
```