// src/utils/shopifyClient.js
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL;

async function getFeaturedProducts() {
  try {
    const response = await fetch(
      `${SHOPIFY_STORE_URL}/api/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({
          query: `
          {
            products(first: 12) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
          `
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data.products.edges.map(({ node }) => ({
      id: node.id,
      handle: node.handle,
      name: node.title,
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      currency: node.priceRange.minVariantPrice.currencyCode,
      image: node.images.edges[0]?.node.url
    }));

  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}

async function getProductByHandle(handle) {
  try {
    const response = await fetch(
      `${SHOPIFY_STORE_URL}/api/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN
        },
        body: JSON.stringify({
          query: `
          query getProduct($handle: String!) {
            product(handle: $handle) {
              id
              title
              description
              descriptionHtml
              vendor
              availableForSale
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                name
                values
              }
            }
          }
          `,
          variables: {
            handle: handle
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export { getFeaturedProducts, getProductByHandle };