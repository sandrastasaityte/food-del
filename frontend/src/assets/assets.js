// assets.js

// ===== Icons & General Images =====
import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'

import facebook_icon from './facebook.png'
import linkedin_icon from './linkedin.png'
import twitter_icon from './twitter_icon.png'
import instagram_icon from './instagram.png'

import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_stars from './rating_stars.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

// ===== Menu Images =====
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

// ===== Food Images =====
import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

// ===== Export Assets =====
export const assets = {
  logo,
  basket_icon,
  instagram_icon,
  header_img,
  search_icon,
  rating_stars,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
  foodImages: [
    food_1, food_2, food_3, food_4, food_5, food_6, food_7, food_8,
    food_9, food_10, food_11, food_12, food_13, food_14, food_15, food_16,
    food_17, food_18, food_19, food_20, food_21, food_22, food_23, food_24,
    food_25, food_26, food_27, food_28, food_29, food_30, food_31, food_32
  ]
}

// ===== Menu List =====
export const menu_list = [
  { name: "Salad", image: menu_1 },
  { name: "Rolls", image: menu_2 },
  { name: "Desserts", image: menu_3 },
  { name: "Sandwich", image: menu_4 },
  { name: "Cake", image: menu_5 },
  { name: "Vegetarian", image: menu_6 },
  { name: "Pasta", image: menu_7 },
  { name: "Noodles", image: menu_8 },
]

// ===== Food List =====
export const food_list = [
  { id: 1, name: "Greek Salad", images: [assets.foodImages[0]], price: 9.99, description: "Fresh cucumber, tomatoes, olives, feta and oregano dressing.", category: "Salad" },
  { id: 2, name: "Veg Salad", images: [assets.foodImages[1]], price: 8.49, description: "Mixed seasonal vegetables with a light house dressing.", category: "Salad" },
  { id: 3, name: "Clover Salad", images: [assets.foodImages[2]], price: 8.99, description: "Crunchy greens with herbs, seeds and citrus vinaigrette.", category: "Salad" },
  { id: 4, name: "Chicken Salad", images: [assets.foodImages[3]], price: 11.99, description: "Grilled chicken, fresh greens and creamy sauce.", category: "Salad" },

  { id: 5, name: "Lasagna Rolls", images: [assets.foodImages[4]], price: 10.99, description: "Lasagna-style rolls with cheese and rich tomato sauce.", category: "Rolls" },
  { id: 6, name: "Peri Peri Rolls", images: [assets.foodImages[5]], price: 9.99, description: "Spicy peri peri rolls with a smoky kick.", category: "Rolls" },
  { id: 7, name: "Chicken Rolls", images: [assets.foodImages[6]], price: 11.49, description: "Juicy chicken rolls with fresh veggies and sauce.", category: "Rolls" },
  { id: 8, name: "Veg Rolls", images: [assets.foodImages[7]], price: 9.49, description: "Crispy veggie rolls served with dip.", category: "Rolls" },

  { id: 9, name: "Ripple Ice Cream", images: [assets.foodImages[8]], price: 5.99, description: "Creamy ripple ice cream dessert.", category: "Desserts" },
  { id: 10, name: "Fruit Ice Cream", images: [assets.foodImages[9]], price: 6.49, description: "Fruit-infused ice cream with a refreshing taste.", category: "Desserts" },
  { id: 11, name: "Jar Ice Cream", images: [assets.foodImages[10]], price: 5.49, description: "Layered jar dessert with creamy ice cream.", category: "Desserts" },
  { id: 12, name: "Vanilla Ice Cream", images: [assets.foodImages[11]], price: 4.99, description: "Classic vanilla ice cream made extra smooth.", category: "Desserts" },

  { id: 13, name: "Chicken Sandwich", images: [assets.foodImages[12]], price: 6.99, description: "Toasted sandwich with chicken and house sauce.", category: "Sandwich" },
  { id: 14, name: "Vegan Sandwich", images: [assets.foodImages[13]], price: 6.49, description: "Plant-based sandwich with fresh veggies and spread.", category: "Sandwich" },
  { id: 15, name: "Grilled Sandwich", images: [assets.foodImages[14]], price: 6.79, description: "Grilled sandwich with melted filling and crisp bread.", category: "Sandwich" },
  { id: 16, name: "Bread Sandwich", images: [assets.foodImages[15]], price: 5.99, description: "Simple classic sandwich—quick and satisfying.", category: "Sandwich" },

  { id: 17, name: "Cup Cake", images: [assets.foodImages[16]], price: 3.49, description: "Soft cupcake topped with sweet frosting.", category: "Cake" },
  { id: 18, name: "Vegan Cake", images: [assets.foodImages[17]], price: 3.99, description: "Moist vegan cake slice—light and delicious.", category: "Cake" },
  { id: 19, name: "Butterscotch Cake", images: [assets.foodImages[18]], price: 4.49, description: "Rich butterscotch cake slice with creamy topping.", category: "Cake" },
  { id: 20, name: "Sliced Cake", images: [assets.foodImages[19]], price: 3.99, description: "Daily cake slice—soft, sweet and fresh.", category: "Cake" },

  { id: 21, name: "Garlic Mushroom", images: [assets.foodImages[20]], price: 7.49, description: "Garlic sautéed mushrooms with herbs.", category: "Vegetarian" },
  { id: 22, name: "Fried Cauliflower", images: [assets.foodImages[21]], price: 7.99, description: "Crispy fried cauliflower florets with seasoning.", category: "Vegetarian" },
  { id: 23, name: "Mix Veg Pulao", images: [assets.foodImages[22]], price: 8.49, description: "Fragrant rice with mixed vegetables and spices.", category: "Vegetarian" },
  { id: 24, name: "Rice Zucchini", images: [assets.foodImages[23]], price: 7.99, description: "Light zucchini rice bowl with herbs and seasoning.", category: "Vegetarian" },

  { id: 25, name: "Cheese Pasta", images: [assets.foodImages[24]], price: 10.49, description: "Creamy cheese pasta with herbs.", category: "Pasta" },
  { id: 26, name: "Tomato Pasta", images: [assets.foodImages[25]], price: 9.99, description: "Classic tomato pasta with rich sauce.", category: "Pasta" },
  { id: 27, name: "Creamy Pasta", images: [assets.foodImages[26]], price: 10.99, description: "Silky creamy pasta with a smooth finish.", category: "Pasta" },
  { id: 28, name: "Chicken Pasta", images: [assets.foodImages[27]], price: 12.49, description: "Chicken pasta with creamy sauce and seasoning.", category: "Pasta" },

  { id: 29, name: "Butter Noodles", images: [assets.foodImages[28]], price: 8.49, description: "Comfort noodles with butter and mild seasoning.", category: "Noodles" },
  { id: 30, name: "Veg Noodles", images: [assets.foodImages[29]], price: 8.99, description: "Stir-fried noodles with mixed vegetables.", category: "Noodles" },
  { id: 31, name: "Somen Noodles", images: [assets.foodImages[30]], price: 9.49, description: "Light somen noodles served with sauce and garnish.", category: "Noodles" },
  { id: 32, name: "Cooked Noodles", images: [assets.foodImages[31]], price: 8.79, description: "Warm noodles cooked with herbs and vegetables.", category: "Noodles" },
];
