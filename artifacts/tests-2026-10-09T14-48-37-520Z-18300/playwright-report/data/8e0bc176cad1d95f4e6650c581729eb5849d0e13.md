# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: journey.spec.ts >> search, details, cart, browse and guest account entry @journey
- Location: tests\journey.spec.ts:10:5

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('#Women a').filter({ hasText: /^Tops$/ })

```

# Page snapshot

```yaml
- generic [ref=f64e1]:
  - banner [ref=f64e2]:
    - generic [ref=f64e5]:
      - link [ref=f64e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f64e9]
      - list [ref=f64e12]:
        - listitem [ref=f64e13]:
          - link " Home" [ref=f64e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f64e15]: 
            - text: Home
        - listitem [ref=f64e16]:
          - link " Products" [ref=f64e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f64e18]: 
            - text: Products
        - listitem [ref=f64e19]:
          - link " Cart" [ref=f64e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f64e21]: 
            - text: Cart
        - listitem [ref=f64e22]:
          - link " Signup / Login" [ref=f64e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f64e24]: 
            - text: Signup / Login
        - listitem [ref=f64e25]:
          - link " Test Cases" [ref=f64e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f64e27]: 
            - text: Test Cases
        - listitem [ref=f64e28]:
          - link " API Testing" [ref=f64e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f64e30]: 
            - text: API Testing
        - listitem [ref=f64e31]:
          - link " Video Tutorials" [ref=f64e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f64e33]: 
            - text: Video Tutorials
        - listitem [ref=f64e34]:
          - link " Contact us" [ref=f64e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f64e36]: 
            - text: Contact us
      - insertion [ref=f64e38]:
        - generic [ref=f64e41]:
          - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e43]: Discover more
          - link "Website design services" [ref=f64e44] [cursor=pointer]
          - link "Online clothing store" [ref=f64e49] [cursor=pointer]
          - link "Credit card offers" [ref=f64e54] [cursor=pointer]
  - generic [ref=f64e60]:
    - img "Website for practice" [ref=f64e61]
    - textbox "Search Product" [ref=f64e62]
    - button "" [ref=f64e63] [cursor=pointer]
  - generic [ref=f64e67]:
    - generic [ref=f64e69]:
      - heading "Category" [level=2] [ref=f64e70]
      - generic [ref=f64e71]:
        - generic [ref=f64e72]:
          - heading [level=4] [ref=f64e74]:
            - link " Women" [active] [ref=f64e75] [cursor=pointer]:
              - /url: "#Women"
              - generic [ref=f64e76]: 
              - text: Women
          - list [ref=f64e80]:
            - listitem [ref=f64e81]:
              - link "Dress" [ref=f64e82] [cursor=pointer]:
                - /url: /category_products/1
            - listitem [ref=f64e83]:
              - link "Tops" [ref=f64e84] [cursor=pointer]:
                - /url: /category_products/2
            - listitem [ref=f64e85]:
              - link "Saree" [ref=f64e86] [cursor=pointer]:
                - /url: /category_products/7
        - heading [level=4] [ref=f64e89]:
          - link " Men" [ref=f64e90] [cursor=pointer]:
            - /url: "#Men"
            - generic [ref=f64e91]: 
            - text: Men
        - heading [level=4] [ref=f64e95]:
          - link " Kids" [ref=f64e96] [cursor=pointer]:
            - /url: "#Kids"
            - generic [ref=f64e97]: 
            - text: Kids
      - generic [ref=f64e99]:
        - heading "Brands" [level=2] [ref=f64e100]
        - list [ref=f64e102]:
          - listitem [ref=f64e103]:
            - link "(6) Polo" [ref=f64e104] [cursor=pointer]:
              - /url: /brand_products/Polo
              - generic [ref=f64e105]: (6)
              - text: Polo
          - listitem [ref=f64e106]:
            - link "(5) H&M" [ref=f64e107] [cursor=pointer]:
              - /url: /brand_products/H&M
              - generic [ref=f64e108]: (5)
              - text: H&M
          - listitem [ref=f64e109]:
            - link "(5) Madame" [ref=f64e110] [cursor=pointer]:
              - /url: /brand_products/Madame
              - generic [ref=f64e111]: (5)
              - text: Madame
          - listitem [ref=f64e112]:
            - link "(3) Mast & Harbour" [ref=f64e113] [cursor=pointer]:
              - /url: /brand_products/Mast & Harbour
              - generic [ref=f64e114]: (3)
              - text: Mast & Harbour
          - listitem [ref=f64e115]:
            - link "(4) Babyhug" [ref=f64e116] [cursor=pointer]:
              - /url: /brand_products/Babyhug
              - generic [ref=f64e117]: (4)
              - text: Babyhug
          - listitem [ref=f64e118]:
            - link "(3) Allen Solly Junior" [ref=f64e119] [cursor=pointer]:
              - /url: /brand_products/Allen Solly Junior
              - generic [ref=f64e120]: (3)
              - text: Allen Solly Junior
          - listitem [ref=f64e121]:
            - link "(3) Kookie Kids" [ref=f64e122] [cursor=pointer]:
              - /url: /brand_products/Kookie Kids
              - generic [ref=f64e123]: (3)
              - text: Kookie Kids
          - listitem [ref=f64e124]:
            - link "(5) Biba" [ref=f64e125] [cursor=pointer]:
              - /url: /brand_products/Biba
              - generic [ref=f64e126]: (5)
              - text: Biba
    - insertion [ref=f64e128]:
      - generic [ref=f64e131]:
        - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e133]: Discover more
        - link "Newspaper subscription" [ref=f64e134] [cursor=pointer]
        - link "Men's Jeans" [ref=f64e139] [cursor=pointer]
        - link "Kids Clothing" [ref=f64e144] [cursor=pointer]
        - link "Polo Brand Clothing" [ref=f64e149] [cursor=pointer]
        - link "T SHIRT" [ref=f64e154] [cursor=pointer]
    - generic [ref=f64e160]:
      - heading "All Products" [level=2] [ref=f64e161]
      - generic [ref=f64e162]:
        - generic [ref=f64e163]:
          - generic [ref=f64e164]:
            - generic [ref=f64e165]:
              - img "ecommerce website products" [ref=f64e166]
              - heading "Rs. 500" [level=2] [ref=f64e167]
              - paragraph [ref=f64e168]: Blue Top
              - generic [ref=f64e169] [cursor=pointer]:
                - generic [ref=f64e170]: 
                - text: Add to cart
            - generic [ref=f64e171]:
              - heading "Rs. 500" [level=2] [ref=f64e172]
              - paragraph [ref=f64e173]: Blue Top
              - generic [ref=f64e174] [cursor=pointer]:
                - generic [ref=f64e175]: 
                - text: Add to cart
          - list [ref=f64e177]:
            - listitem [ref=f64e178]:
              - link " View Product" [ref=f64e179] [cursor=pointer]:
                - /url: /product_details/1
                - generic [ref=f64e180]: 
                - text: View Product
        - insertion [ref=f64e182]:
          - generic [ref=f64e185]:
            - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e187]: Discover more
            - link "Dresses" [ref=f64e188] [cursor=pointer]
            - link "Biba Brand Clothing" [ref=f64e193] [cursor=pointer]
            - link "Source Fabrics" [ref=f64e198] [cursor=pointer]
      - generic [ref=f64e203]:
        - generic [ref=f64e204]:
          - generic [ref=f64e205]:
            - generic [ref=f64e206]:
              - img "ecommerce website products" [ref=f64e207]
              - heading "Rs. 400" [level=2] [ref=f64e208]
              - paragraph [ref=f64e209]:
                - text: Men
                - link "Tshirt" [ref=f64e210] [cursor=pointer]:
                  - /url: "#"
              - generic [ref=f64e213] [cursor=pointer]:
                - generic [ref=f64e214]: 
                - text: Add to cart
            - generic [ref=f64e215]:
              - heading "Rs. 400" [level=2] [ref=f64e216]
              - paragraph [ref=f64e217]: Men Tshirt
              - generic [ref=f64e218] [cursor=pointer]:
                - generic [ref=f64e219]: 
                - text: Add to cart
          - list [ref=f64e221]:
            - listitem [ref=f64e222]:
              - link " View Product" [ref=f64e223] [cursor=pointer]:
                - /url: /product_details/2
                - generic [ref=f64e224]: 
                - text: View Product
        - insertion [ref=f64e226]:
          - generic [ref=f64e229]:
            - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e231]: Discover more
            - link "H&M Brand Clothing" [ref=f64e232] [cursor=pointer]
            - link "Madame Brand Clothing" [ref=f64e237] [cursor=pointer]
            - link "Mast & Harbour" [ref=f64e242] [cursor=pointer]
      - generic [ref=f64e248]:
        - generic [ref=f64e249]:
          - generic [ref=f64e250]:
            - img "ecommerce website products" [ref=f64e251]
            - heading "Rs. 1000" [level=2] [ref=f64e252]
            - paragraph [ref=f64e253]:
              - text: Sleeveless
              - link "Dress" [ref=f64e254] [cursor=pointer]:
                - /url: "#"
            - generic [ref=f64e257] [cursor=pointer]:
              - generic [ref=f64e258]: 
              - text: Add to cart
          - generic [ref=f64e259]:
            - heading "Rs. 1000" [level=2] [ref=f64e260]
            - paragraph [ref=f64e261]: Sleeveless Dress
            - generic [ref=f64e262] [cursor=pointer]:
              - generic [ref=f64e263]: 
              - text: Add to cart
        - list [ref=f64e265]:
          - listitem [ref=f64e266]:
            - link " View Product" [ref=f64e267] [cursor=pointer]:
              - /url: /product_details/3
              - generic [ref=f64e268]: 
              - text: View Product
      - generic [ref=f64e270]:
        - generic [ref=f64e271]:
          - generic [ref=f64e272]:
            - img "ecommerce website products" [ref=f64e273]
            - heading "Rs. 1500" [level=2] [ref=f64e274]
            - paragraph [ref=f64e275]: Stylish Dress
            - generic [ref=f64e276] [cursor=pointer]:
              - generic [ref=f64e277]: 
              - text: Add to cart
          - generic [ref=f64e278]:
            - heading "Rs. 1500" [level=2] [ref=f64e279]
            - paragraph [ref=f64e280]: Stylish Dress
            - generic [ref=f64e281] [cursor=pointer]:
              - generic [ref=f64e282]: 
              - text: Add to cart
        - list [ref=f64e284]:
          - listitem [ref=f64e285]:
            - link " View Product" [ref=f64e286] [cursor=pointer]:
              - /url: /product_details/4
              - generic [ref=f64e287]: 
              - text: View Product
      - insertion [ref=f64e289]:
        - generic [ref=f64e292]:
          - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e294]: Discover more
          - link "Shop T-Shirts" [ref=f64e295] [cursor=pointer]
          - link "Clothing" [ref=f64e300] [cursor=pointer]
      - generic [ref=f64e306]:
        - generic [ref=f64e307]:
          - generic [ref=f64e308]:
            - img "ecommerce website products" [ref=f64e309]
            - heading "Rs. 600" [level=2] [ref=f64e310]
            - paragraph [ref=f64e311]: Winter Top
            - generic [ref=f64e312] [cursor=pointer]:
              - generic [ref=f64e313]: 
              - text: Add to cart
          - generic [ref=f64e314]:
            - heading "Rs. 600" [level=2] [ref=f64e315]
            - paragraph [ref=f64e316]: Winter Top
            - generic [ref=f64e317] [cursor=pointer]:
              - generic [ref=f64e318]: 
              - text: Add to cart
        - list [ref=f64e320]:
          - listitem [ref=f64e321]:
            - link " View Product" [ref=f64e322] [cursor=pointer]:
              - /url: /product_details/5
              - generic [ref=f64e323]: 
              - text: View Product
      - generic [ref=f64e325]:
        - generic [ref=f64e326]:
          - generic [ref=f64e327]:
            - img "ecommerce website products" [ref=f64e328]
            - heading "Rs. 400" [level=2] [ref=f64e329]
            - paragraph [ref=f64e330]: Summer White Top
            - generic [ref=f64e331] [cursor=pointer]:
              - generic [ref=f64e332]: 
              - text: Add to cart
          - generic [ref=f64e333]:
            - heading "Rs. 400" [level=2] [ref=f64e334]
            - paragraph [ref=f64e335]: Summer White Top
            - generic [ref=f64e336] [cursor=pointer]:
              - generic [ref=f64e337]: 
              - text: Add to cart
        - list [ref=f64e339]:
          - listitem [ref=f64e340]:
            - link " View Product" [ref=f64e341] [cursor=pointer]:
              - /url: /product_details/6
              - generic [ref=f64e342]: 
              - text: View Product
      - insertion [ref=f64e344]:
        - generic [ref=f64e347]:
          - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e349]: Discover more
          - link "Prototype Ideas" [ref=f64e350] [cursor=pointer]
          - link "Source Suppliers" [ref=f64e355] [cursor=pointer]
          - link "Babyhug Brand Clothing" [ref=f64e360] [cursor=pointer]
      - generic [ref=f64e366]:
        - generic [ref=f64e367]:
          - generic [ref=f64e368]:
            - img "ecommerce website products" [ref=f64e369]
            - heading "Rs. 1000" [level=2] [ref=f64e370]
            - paragraph [ref=f64e371]: Madame Top For Women
            - generic [ref=f64e372] [cursor=pointer]:
              - generic [ref=f64e373]: 
              - text: Add to cart
          - generic [ref=f64e374]:
            - heading "Rs. 1000" [level=2] [ref=f64e375]
            - paragraph [ref=f64e376]: Madame Top For Women
            - generic [ref=f64e377] [cursor=pointer]:
              - generic [ref=f64e378]: 
              - text: Add to cart
        - list [ref=f64e380]:
          - listitem [ref=f64e381]:
            - link " View Product" [ref=f64e382] [cursor=pointer]:
              - /url: /product_details/7
              - generic [ref=f64e383]: 
              - text: View Product
      - generic [ref=f64e384]:
        - generic [ref=f64e385]:
          - generic [ref=f64e386]:
            - generic [ref=f64e387]:
              - img "ecommerce website products" [ref=f64e388]
              - heading "Rs. 700" [level=2] [ref=f64e389]
              - paragraph [ref=f64e390]: Fancy Green Top
              - generic [ref=f64e391] [cursor=pointer]:
                - generic [ref=f64e392]: 
                - text: Add to cart
            - generic [ref=f64e393]:
              - heading "Rs. 700" [level=2] [ref=f64e394]
              - paragraph [ref=f64e395]: Fancy Green Top
              - generic [ref=f64e396] [cursor=pointer]:
                - generic [ref=f64e397]: 
                - text: Add to cart
          - list [ref=f64e399]:
            - listitem [ref=f64e400]:
              - link " View Product" [ref=f64e401] [cursor=pointer]:
                - /url: /product_details/8
                - generic [ref=f64e402]: 
                - text: View Product
        - insertion [ref=f64e404]:
          - generic [ref=f64e407]:
            - heading "These are topics related to the article that might interest you" [level=2] [ref=f64e409]: Discover more
            - link "Allen Solly Junior" [ref=f64e410] [cursor=pointer]
            - link "Kookie Kids" [ref=f64e415] [cursor=pointer]
            - link "Discover Dresses" [ref=f64e420] [cursor=pointer]
      - generic [ref=f64e426]:
        - generic [ref=f64e427]:
          - generic [ref=f64e428]:
            - img "ecommerce website products" [ref=f64e429]
            - heading "Rs. 499" [level=2] [ref=f64e430]
            - paragraph [ref=f64e431]:
              - text: Sleeves Printed Top - White
              - link "Read Economics" [ref=f64e432] [cursor=pointer]
            - generic [ref=f64e436] [cursor=pointer]:
              - generic [ref=f64e437]: 
              - text: Add to cart
          - generic [ref=f64e438]:
            - heading "Rs. 499" [level=2] [ref=f64e439]
            - paragraph [ref=f64e440]: Sleeves Printed Top - White
            - generic [ref=f64e441] [cursor=pointer]:
              - generic [ref=f64e442]: 
              - text: Add to cart
        - list [ref=f64e444]:
          - listitem [ref=f64e445]:
            - link " View Product" [ref=f64e446] [cursor=pointer]:
              - /url: /product_details/11
              - generic [ref=f64e447]: 
              - text: View Product
      - generic [ref=f64e448]:
        - generic [ref=f64e449]:
          - generic [ref=f64e450]:
            - generic [ref=f64e451]:
              - img "ecommerce website products" [ref=f64e452]
              - heading "Rs. 359" [level=2] [ref=f64e453]
              - paragraph [ref=f64e454]: Half Sleeves Top Schiffli Detailing - Pink
              - generic [ref=f64e455] [cursor=pointer]:
                - generic [ref=f64e456]: 
                - text: Add to cart
            - generic [ref=f64e457]:
              - heading "Rs. 359" [level=2] [ref=f64e458]
              - paragraph [ref=f64e459]: Half Sleeves Top Schiffli Detailing - Pink
              - generic [ref=f64e460] [cursor=pointer]:
                - generic [ref=f64e461]: 
                - text: Add to cart
          - list [ref=f64e463]:
            - listitem [ref=f64e464]:
              - link " View Product" [ref=f64e465] [cursor=pointer]:
                - /url: /product_details/12
                - generic [ref=f64e466]: 
                - text: View Product
        - insertion [ref=f64e468]
      - generic [ref=f64e471]:
        - generic [ref=f64e472]:
          - generic [ref=f64e473]:
            - img "ecommerce website products" [ref=f64e474]
            - heading "Rs. 278" [level=2] [ref=f64e475]
            - paragraph [ref=f64e476]: Frozen Tops For Kids
            - generic [ref=f64e477] [cursor=pointer]:
              - generic [ref=f64e478]: 
              - text: Add to cart
          - generic [ref=f64e479]:
            - heading "Rs. 278" [level=2] [ref=f64e480]
            - paragraph [ref=f64e481]: Frozen Tops For Kids
            - generic [ref=f64e482] [cursor=pointer]:
              - generic [ref=f64e483]: 
              - text: Add to cart
        - list [ref=f64e485]:
          - listitem [ref=f64e486]:
            - link " View Product" [ref=f64e487] [cursor=pointer]:
              - /url: /product_details/13
              - generic [ref=f64e488]: 
              - text: View Product
      - generic [ref=f64e490]:
        - generic [ref=f64e491]:
          - generic [ref=f64e492]:
            - img "ecommerce website products" [ref=f64e493]
            - heading "Rs. 679" [level=2] [ref=f64e494]
            - paragraph [ref=f64e495]:
              - text: Full Sleeves Top Cherry - Pink
              - link "T-Shirts" [ref=f64e496] [cursor=pointer]
            - generic [ref=f64e500] [cursor=pointer]:
              - generic [ref=f64e501]: 
              - text: Add to cart
          - generic [ref=f64e502]:
            - heading "Rs. 679" [level=2] [ref=f64e503]
            - paragraph [ref=f64e504]: Full Sleeves Top Cherry - Pink
            - generic [ref=f64e505] [cursor=pointer]:
              - generic [ref=f64e506]: 
              - text: Add to cart
        - list [ref=f64e508]:
          - listitem [ref=f64e509]:
            - link " View Product" [ref=f64e510] [cursor=pointer]:
              - /url: /product_details/14
              - generic [ref=f64e511]: 
              - text: View Product
      - insertion [ref=f64e513]
      - generic [ref=f64e516]:
        - generic [ref=f64e517]:
          - generic [ref=f64e518]:
            - img "ecommerce website products" [ref=f64e519]
            - heading "Rs. 315" [level=2] [ref=f64e520]
            - paragraph [ref=f64e521]: Printed Off Shoulder Top - White
            - generic [ref=f64e522] [cursor=pointer]:
              - generic [ref=f64e523]: 
              - text: Add to cart
          - generic [ref=f64e524]:
            - heading "Rs. 315" [level=2] [ref=f64e525]
            - paragraph [ref=f64e526]: Printed Off Shoulder Top - White
            - generic [ref=f64e527] [cursor=pointer]:
              - generic [ref=f64e528]: 
              - text: Add to cart
        - list [ref=f64e530]:
          - listitem [ref=f64e531]:
            - link " View Product" [ref=f64e532] [cursor=pointer]:
              - /url: /product_details/15
              - generic [ref=f64e533]: 
              - text: View Product
      - generic [ref=f64e534]:
        - generic [ref=f64e535]:
          - generic [ref=f64e536]:
            - generic [ref=f64e537]:
              - img "ecommerce website products" [ref=f64e538]
              - heading "Rs. 478" [level=2] [ref=f64e539]
              - paragraph [ref=f64e540]: Sleeves Top and Short - Blue & Pink
              - generic [ref=f64e541] [cursor=pointer]:
                - generic [ref=f64e542]: 
                - text: Add to cart
            - generic [ref=f64e543]:
              - heading "Rs. 478" [level=2] [ref=f64e544]
              - paragraph [ref=f64e545]: Sleeves Top and Short - Blue & Pink
              - generic [ref=f64e546] [cursor=pointer]:
                - generic [ref=f64e547]: 
                - text: Add to cart
          - list [ref=f64e549]:
            - listitem [ref=f64e550]:
              - link " View Product" [ref=f64e551] [cursor=pointer]:
                - /url: /product_details/16
                - generic [ref=f64e552]: 
                - text: View Product
        - insertion [ref=f64e554]
      - generic [ref=f64e557]:
        - generic [ref=f64e558]:
          - generic [ref=f64e559]:
            - img "ecommerce website products" [ref=f64e560]
            - heading "Rs. 1200" [level=2] [ref=f64e561]
            - paragraph [ref=f64e562]: Little Girls Mr. Panda Shirt
            - generic [ref=f64e563] [cursor=pointer]:
              - generic [ref=f64e564]: 
              - text: Add to cart
          - generic [ref=f64e565]:
            - heading "Rs. 1200" [level=2] [ref=f64e566]
            - paragraph [ref=f64e567]: Little Girls Mr. Panda Shirt
            - generic [ref=f64e568] [cursor=pointer]:
              - generic [ref=f64e569]: 
              - text: Add to cart
        - list [ref=f64e571]:
          - listitem [ref=f64e572]:
            - link " View Product" [ref=f64e573] [cursor=pointer]:
              - /url: /product_details/18
              - generic [ref=f64e574]: 
              - text: View Product
      - generic [ref=f64e575]:
        - generic [ref=f64e576]:
          - generic [ref=f64e577]:
            - generic [ref=f64e578]:
              - img "ecommerce website products" [ref=f64e579]
              - heading "Rs. 1050" [level=2] [ref=f64e580]
              - paragraph [ref=f64e581]:
                - text: Sleeveless Unicorn Patch Gown - Pink
                - link "Women's Dresses" [ref=f64e582] [cursor=pointer]
              - generic [ref=f64e586] [cursor=pointer]:
                - generic [ref=f64e587]: 
                - text: Add to cart
            - generic [ref=f64e588]:
              - heading "Rs. 1050" [level=2] [ref=f64e589]
              - paragraph [ref=f64e590]: Sleeveless Unicorn Patch Gown - Pink
              - generic [ref=f64e591] [cursor=pointer]:
                - generic [ref=f64e592]: 
                - text: Add to cart
          - list [ref=f64e594]:
            - listitem [ref=f64e595]:
              - link " View Product" [ref=f64e596] [cursor=pointer]:
                - /url: /product_details/19
                - generic [ref=f64e597]: 
                - text: View Product
        - insertion [ref=f64e599]
      - generic [ref=f64e602]:
        - generic [ref=f64e603]:
          - generic [ref=f64e604]:
            - img "ecommerce website products" [ref=f64e605]
            - heading "Rs. 1190" [level=2] [ref=f64e606]
            - paragraph [ref=f64e607]: Cotton Mull Embroidered Dress
            - generic [ref=f64e608] [cursor=pointer]:
              - generic [ref=f64e609]: 
              - text: Add to cart
          - generic [ref=f64e610]:
            - heading "Rs. 1190" [level=2] [ref=f64e611]
            - paragraph [ref=f64e612]: Cotton Mull Embroidered Dress
            - generic [ref=f64e613] [cursor=pointer]:
              - generic [ref=f64e614]: 
              - text: Add to cart
        - list [ref=f64e616]:
          - listitem [ref=f64e617]:
            - link " View Product" [ref=f64e618] [cursor=pointer]:
              - /url: /product_details/20
              - generic [ref=f64e619]: 
              - text: View Product
      - generic [ref=f64e621]:
        - generic [ref=f64e622]:
          - generic [ref=f64e623]:
            - img "ecommerce website products" [ref=f64e624]
            - heading "Rs. 1530" [level=2] [ref=f64e625]
            - paragraph [ref=f64e626]: Blue Cotton Indie Mickey Dress
            - generic [ref=f64e627] [cursor=pointer]:
              - generic [ref=f64e628]: 
              - text: Add to cart
          - generic [ref=f64e629]:
            - heading "Rs. 1530" [level=2] [ref=f64e630]
            - paragraph [ref=f64e631]: Blue Cotton Indie Mickey Dress
            - generic [ref=f64e632] [cursor=pointer]:
              - generic [ref=f64e633]: 
              - text: Add to cart
        - list [ref=f64e635]:
          - listitem [ref=f64e636]:
            - link " View Product" [ref=f64e637] [cursor=pointer]:
              - /url: /product_details/21
              - generic [ref=f64e638]: 
              - text: View Product
      - generic [ref=f64e640]:
        - generic [ref=f64e641]:
          - generic [ref=f64e642]:
            - img "ecommerce website products" [ref=f64e643]
            - heading "Rs. 1600" [level=2] [ref=f64e644]
            - paragraph [ref=f64e645]:
              - text: Long Maxi Tulle Fancy Dress Up Outfits -Pink
              - link "Browse Clothing" [ref=f64e646] [cursor=pointer]
            - generic [ref=f64e650] [cursor=pointer]:
              - generic [ref=f64e651]: 
              - text: Add to cart
          - generic [ref=f64e652]:
            - heading "Rs. 1600" [level=2] [ref=f64e653]
            - paragraph [ref=f64e654]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
            - generic [ref=f64e655] [cursor=pointer]:
              - generic [ref=f64e656]: 
              - text: Add to cart
        - list [ref=f64e658]:
          - listitem [ref=f64e659]:
            - link " View Product" [ref=f64e660] [cursor=pointer]:
              - /url: /product_details/22
              - generic [ref=f64e661]: 
              - text: View Product
      - generic [ref=f64e663]:
        - generic [ref=f64e664]:
          - generic [ref=f64e665]:
            - img "ecommerce website products" [ref=f64e666]
            - heading "Rs. 1100" [level=2] [ref=f64e667]
            - paragraph [ref=f64e668]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=f64e669] [cursor=pointer]:
              - generic [ref=f64e670]: 
              - text: Add to cart
          - generic [ref=f64e671]:
            - heading "Rs. 1100" [level=2] [ref=f64e672]
            - paragraph [ref=f64e673]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=f64e674] [cursor=pointer]:
              - generic [ref=f64e675]: 
              - text: Add to cart
        - list [ref=f64e677]:
          - listitem [ref=f64e678]:
            - link " View Product" [ref=f64e679] [cursor=pointer]:
              - /url: /product_details/23
              - generic [ref=f64e680]: 
              - text: View Product
      - generic [ref=f64e682]:
        - generic [ref=f64e683]:
          - generic [ref=f64e684]:
            - img "ecommerce website products" [ref=f64e685]
            - heading "Rs. 849" [level=2] [ref=f64e686]
            - paragraph [ref=f64e687]: Colour Blocked Shirt – Sky Blue
            - generic [ref=f64e688] [cursor=pointer]:
              - generic [ref=f64e689]: 
              - text: Add to cart
          - generic [ref=f64e690]:
            - heading "Rs. 849" [level=2] [ref=f64e691]
            - paragraph [ref=f64e692]: Colour Blocked Shirt – Sky Blue
            - generic [ref=f64e693] [cursor=pointer]:
              - generic [ref=f64e694]: 
              - text: Add to cart
        - list [ref=f64e696]:
          - listitem [ref=f64e697]:
            - link " View Product" [ref=f64e698] [cursor=pointer]:
              - /url: /product_details/24
              - generic [ref=f64e699]: 
              - text: View Product
      - generic [ref=f64e701]:
        - generic [ref=f64e702]:
          - generic [ref=f64e703]:
            - img "ecommerce website products" [ref=f64e704]
            - heading "Rs. 1299" [level=2] [ref=f64e705]
            - paragraph [ref=f64e706]:
              - text: Pure Cotton V-Neck
              - link "T-Shirt" [ref=f64e707] [cursor=pointer]:
                - /url: "#"
            - generic [ref=f64e710] [cursor=pointer]:
              - generic [ref=f64e711]: 
              - text: Add to cart
          - generic [ref=f64e712]:
            - heading "Rs. 1299" [level=2] [ref=f64e713]
            - paragraph [ref=f64e714]: Pure Cotton V-Neck T-Shirt
            - generic [ref=f64e715] [cursor=pointer]:
              - generic [ref=f64e716]: 
              - text: Add to cart
        - list [ref=f64e718]:
          - listitem [ref=f64e719]:
            - link " View Product" [ref=f64e720] [cursor=pointer]:
              - /url: /product_details/28
              - generic [ref=f64e721]: 
              - text: View Product
      - generic [ref=f64e723]:
        - generic [ref=f64e724]:
          - generic [ref=f64e725]:
            - img "ecommerce website products" [ref=f64e726]
            - heading "Rs. 1000" [level=2] [ref=f64e727]
            - paragraph [ref=f64e728]: Green Side Placket Detail T-Shirt
            - generic [ref=f64e729] [cursor=pointer]:
              - generic [ref=f64e730]: 
              - text: Add to cart
          - generic [ref=f64e731]:
            - heading "Rs. 1000" [level=2] [ref=f64e732]
            - paragraph [ref=f64e733]: Green Side Placket Detail T-Shirt
            - generic [ref=f64e734] [cursor=pointer]:
              - generic [ref=f64e735]: 
              - text: Add to cart
        - list [ref=f64e737]:
          - listitem [ref=f64e738]:
            - link " View Product" [ref=f64e739] [cursor=pointer]:
              - /url: /product_details/29
              - generic [ref=f64e740]: 
              - text: View Product
      - generic [ref=f64e742]:
        - generic [ref=f64e743]:
          - generic [ref=f64e744]:
            - img "ecommerce website products" [ref=f64e745]
            - heading "Rs. 1500" [level=2] [ref=f64e746]
            - paragraph [ref=f64e747]: Premium Polo T-Shirts
            - generic [ref=f64e748] [cursor=pointer]:
              - generic [ref=f64e749]: 
              - text: Add to cart
          - generic [ref=f64e750]:
            - heading "Rs. 1500" [level=2] [ref=f64e751]
            - paragraph [ref=f64e752]: Premium Polo T-Shirts
            - generic [ref=f64e753] [cursor=pointer]:
              - generic [ref=f64e754]: 
              - text: Add to cart
        - list [ref=f64e756]:
          - listitem [ref=f64e757]:
            - link " View Product" [ref=f64e758] [cursor=pointer]:
              - /url: /product_details/30
              - generic [ref=f64e759]: 
              - text: View Product
      - generic [ref=f64e761]:
        - generic [ref=f64e762]:
          - generic [ref=f64e763]:
            - img "ecommerce website products" [ref=f64e764]
            - heading "Rs. 850" [level=2] [ref=f64e765]
            - paragraph [ref=f64e766]: Pure Cotton Neon Green Tshirt
            - generic [ref=f64e767] [cursor=pointer]:
              - generic [ref=f64e768]: 
              - text: Add to cart
          - generic [ref=f64e769]:
            - heading "Rs. 850" [level=2] [ref=f64e770]
            - paragraph [ref=f64e771]: Pure Cotton Neon Green Tshirt
            - generic [ref=f64e772] [cursor=pointer]:
              - generic [ref=f64e773]: 
              - text: Add to cart
        - list [ref=f64e775]:
          - listitem [ref=f64e776]:
            - link " View Product" [ref=f64e777] [cursor=pointer]:
              - /url: /product_details/31
              - generic [ref=f64e778]: 
              - text: View Product
      - generic [ref=f64e780]:
        - generic [ref=f64e781]:
          - generic [ref=f64e782]:
            - img "ecommerce website products" [ref=f64e783]
            - heading "Rs. 799" [level=2] [ref=f64e784]
            - paragraph [ref=f64e785]: Soft Stretch Jeans
            - generic [ref=f64e786] [cursor=pointer]:
              - generic [ref=f64e787]: 
              - text: Add to cart
          - generic [ref=f64e788]:
            - heading "Rs. 799" [level=2] [ref=f64e789]
            - paragraph [ref=f64e790]: Soft Stretch Jeans
            - generic [ref=f64e791] [cursor=pointer]:
              - generic [ref=f64e792]: 
              - text: Add to cart
        - list [ref=f64e794]:
          - listitem [ref=f64e795]:
            - link " View Product" [ref=f64e796] [cursor=pointer]:
              - /url: /product_details/33
              - generic [ref=f64e797]: 
              - text: View Product
      - generic [ref=f64e799]:
        - generic [ref=f64e800]:
          - generic [ref=f64e801]:
            - img "ecommerce website products" [ref=f64e802]
            - heading "Rs. 1200" [level=2] [ref=f64e803]
            - paragraph [ref=f64e804]: Regular Fit Straight Jeans
            - generic [ref=f64e805] [cursor=pointer]:
              - generic [ref=f64e806]: 
              - text: Add to cart
          - generic [ref=f64e807]:
            - heading "Rs. 1200" [level=2] [ref=f64e808]
            - paragraph [ref=f64e809]: Regular Fit Straight Jeans
            - generic [ref=f64e810] [cursor=pointer]:
              - generic [ref=f64e811]: 
              - text: Add to cart
        - list [ref=f64e813]:
          - listitem [ref=f64e814]:
            - link " View Product" [ref=f64e815] [cursor=pointer]:
              - /url: /product_details/35
              - generic [ref=f64e816]: 
              - text: View Product
      - generic [ref=f64e818]:
        - generic [ref=f64e819]:
          - generic [ref=f64e820]:
            - img "ecommerce website products" [ref=f64e821]
            - heading "Rs. 1400" [level=2] [ref=f64e822]
            - paragraph [ref=f64e823]: Grunt Blue Slim Fit Jeans
            - generic [ref=f64e824] [cursor=pointer]:
              - generic [ref=f64e825]: 
              - text: Add to cart
          - generic [ref=f64e826]:
            - heading "Rs. 1400" [level=2] [ref=f64e827]
            - paragraph [ref=f64e828]: Grunt Blue Slim Fit Jeans
            - generic [ref=f64e829] [cursor=pointer]:
              - generic [ref=f64e830]: 
              - text: Add to cart
        - list [ref=f64e832]:
          - listitem [ref=f64e833]:
            - link " View Product" [ref=f64e834] [cursor=pointer]:
              - /url: /product_details/37
              - generic [ref=f64e835]: 
              - text: View Product
      - generic [ref=f64e837]:
        - generic [ref=f64e838]:
          - generic [ref=f64e839]:
            - img "ecommerce website products" [ref=f64e840]
            - heading "Rs. 2300" [level=2] [ref=f64e841]
            - paragraph [ref=f64e842]: Rose Pink Embroidered Maxi Dress
            - generic [ref=f64e843] [cursor=pointer]:
              - generic [ref=f64e844]: 
              - text: Add to cart
          - generic [ref=f64e845]:
            - heading "Rs. 2300" [level=2] [ref=f64e846]
            - paragraph [ref=f64e847]: Rose Pink Embroidered Maxi Dress
            - generic [ref=f64e848] [cursor=pointer]:
              - generic [ref=f64e849]: 
              - text: Add to cart
        - list [ref=f64e851]:
          - listitem [ref=f64e852]:
            - link " View Product" [ref=f64e853] [cursor=pointer]:
              - /url: /product_details/38
              - generic [ref=f64e854]: 
              - text: View Product
      - generic [ref=f64e856]:
        - generic [ref=f64e857]:
          - generic [ref=f64e858]:
            - img "ecommerce website products" [ref=f64e859]
            - heading "Rs. 3000" [level=2] [ref=f64e860]
            - paragraph [ref=f64e861]: Cotton Silk Hand Block Print Saree
            - generic [ref=f64e862] [cursor=pointer]:
              - generic [ref=f64e863]: 
              - text: Add to cart
          - generic [ref=f64e864]:
            - heading "Rs. 3000" [level=2] [ref=f64e865]
            - paragraph [ref=f64e866]: Cotton Silk Hand Block Print Saree
            - generic [ref=f64e867] [cursor=pointer]:
              - generic [ref=f64e868]: 
              - text: Add to cart
        - list [ref=f64e870]:
          - listitem [ref=f64e871]:
            - link " View Product" [ref=f64e872] [cursor=pointer]:
              - /url: /product_details/39
              - generic [ref=f64e873]: 
              - text: View Product
      - generic [ref=f64e875]:
        - generic [ref=f64e876]:
          - generic [ref=f64e877]:
            - img "ecommerce website products" [ref=f64e878]
            - heading "Rs. 3500" [level=2] [ref=f64e879]
            - paragraph [ref=f64e880]: Rust Red Linen Saree
            - generic [ref=f64e881] [cursor=pointer]:
              - generic [ref=f64e882]: 
              - text: Add to cart
          - generic [ref=f64e883]:
            - heading "Rs. 3500" [level=2] [ref=f64e884]
            - paragraph [ref=f64e885]: Rust Red Linen Saree
            - generic [ref=f64e886] [cursor=pointer]:
              - generic [ref=f64e887]: 
              - text: Add to cart
        - list [ref=f64e889]:
          - listitem [ref=f64e890]:
            - link " View Product" [ref=f64e891] [cursor=pointer]:
              - /url: /product_details/40
              - generic [ref=f64e892]: 
              - text: View Product
      - generic [ref=f64e894]:
        - generic [ref=f64e895]:
          - generic [ref=f64e896]:
            - img "ecommerce website products" [ref=f64e897]
            - heading "Rs. 5000" [level=2] [ref=f64e898]
            - paragraph [ref=f64e899]: Beautiful Peacock Blue Cotton Linen Saree
            - generic [ref=f64e900] [cursor=pointer]:
              - generic [ref=f64e901]: 
              - text: Add to cart
          - generic [ref=f64e902]:
            - heading "Rs. 5000" [level=2] [ref=f64e903]
            - paragraph [ref=f64e904]: Beautiful Peacock Blue Cotton Linen Saree
            - generic [ref=f64e905] [cursor=pointer]:
              - generic [ref=f64e906]: 
              - text: Add to cart
        - list [ref=f64e908]:
          - listitem [ref=f64e909]:
            - link " View Product" [ref=f64e910] [cursor=pointer]:
              - /url: /product_details/41
              - generic [ref=f64e911]: 
              - text: View Product
      - generic [ref=f64e913]:
        - generic [ref=f64e914]:
          - generic [ref=f64e915]:
            - img "ecommerce website products" [ref=f64e916]
            - heading "Rs. 1400" [level=2] [ref=f64e917]
            - paragraph [ref=f64e918]: Lace Top For Women
            - generic [ref=f64e919] [cursor=pointer]:
              - generic [ref=f64e920]: 
              - text: Add to cart
          - generic [ref=f64e921]:
            - heading "Rs. 1400" [level=2] [ref=f64e922]
            - paragraph [ref=f64e923]: Lace Top For Women
            - generic [ref=f64e924] [cursor=pointer]:
              - generic [ref=f64e925]: 
              - text: Add to cart
        - list [ref=f64e927]:
          - listitem [ref=f64e928]:
            - link " View Product" [ref=f64e929] [cursor=pointer]:
              - /url: /product_details/42
              - generic [ref=f64e930]: 
              - text: View Product
      - generic [ref=f64e932]:
        - generic [ref=f64e933]:
          - generic [ref=f64e934]:
            - img "ecommerce website products" [ref=f64e935]
            - heading "Rs. 1389" [level=2] [ref=f64e936]
            - paragraph [ref=f64e937]:
              - text: GRAPHIC DESIGN MEN T SHIRT - BLUE
              - link "Women's Dresses" [ref=f64e938] [cursor=pointer]
            - generic [ref=f64e942] [cursor=pointer]:
              - generic [ref=f64e943]: 
              - text: Add to cart
          - generic [ref=f64e944]:
            - heading "Rs. 1389" [level=2] [ref=f64e945]
            - paragraph [ref=f64e946]: GRAPHIC DESIGN MEN T SHIRT - BLUE
            - generic [ref=f64e947] [cursor=pointer]:
              - generic [ref=f64e948]: 
              - text: Add to cart
        - list [ref=f64e950]:
          - listitem [ref=f64e951]:
            - link " View Product" [ref=f64e952] [cursor=pointer]:
              - /url: /product_details/43
              - generic [ref=f64e953]: 
              - text: View Product
  - insertion [ref=f64e955]
  - contentinfo [ref=f64e957]:
    - generic [ref=f64e962]:
      - heading "Subscription" [level=2] [ref=f64e963]
      - generic [ref=f64e964]:
        - textbox "Your email address" [ref=f64e965]
        - button "" [ref=f64e966] [cursor=pointer]
        - paragraph [ref=f64e968]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f64e972]: Copyright © 2021 All rights reserved
  - link "" [ref=f64e973] [cursor=pointer]:
    - /url: "#top"
  - insertion [ref=f64e976]
```

# Test source

```ts
  5   | import { BASE_URL, normalizeName, parsePrice } from '../src/shared.js';
  6   | import { Ledger, site, navigate, snapshotControl, activeControl, layout, axe, detail, addToCart, viewCart, cart, emptyCart, sameName, samePrice, validLine, errorSummary } from '../src/journey.js';
  7   | 
  8   | // These tests collect passing behaviour and defects in a per-check ledger. A suite pass means
  9   | // collection completed; customer-facing failures remain explicitly marked fail in that ledger.
  10  | test('search, details, cart, browse and guest account entry @journey', async ({ page, request }, testInfo) => {
  11  |   const ledger = new Ledger(testInfo, 'journey');
  12  |   try {
  13  |     const searchResponse = await request.post(`${BASE_URL}/api/searchProduct`, { form: { search_product: 'top' } });
  14  |     const searchBody = await searchResponse.json();
  15  |     const products: { id: number; name: string; price: string }[] = searchBody.products ?? [];
  16  |     expect(products.length, 'matching products prerequisite').toBeGreaterThan(0);
  17  |     ledger.facts.api = { url: searchResponse.url(), httpStatus: searchResponse.status(), body: searchBody };
  18  |     await navigate(page, '/products');
  19  |     const search = page.locator(site.search), submit = page.locator(site.searchButton);
  20  |     await search.fill('top');
  21  |     await search.focus();
  22  |     const searchStructure = { field: await snapshotControl(search), button: await snapshotControl(submit), axe: await axe(page, '#search') };
  23  |     ledger.facts.searchStructure = searchStructure;
  24  |     ledger.record('FE-SEARCH-AXE', '#search', 'Scoped automated accessibility check completes without violations',
  25  |       'Automated WCAG check supplements keyboard inspection; incomplete/manual items are not asserted as passes', searchStructure.axe,
  26  |       searchStructure.axe.status === 'blocked' ? 'blocked' : searchStructure.axe.violations.length ? 'fail' : 'pass');
  27  |     ledger.record('FE-SEARCH-NAME', { url: page.url() }, 'Search field and search button expose names describing their purpose',
  28  |       'WCAG 2.2 4.1.2 Name, Role, Value', searchStructure,
  29  |       /Search Product/.test(searchStructure.field.aria) && /button[^\n]*"[^\"]+"/.test(searchStructure.button.aria) ? 'pass' : 'fail');
  30  |     await page.keyboard.press('Tab');
  31  |     const searchTab = await activeControl(page);
  32  |     ledger.record('FE-SEARCH-TAB', 'Tab from search field', 'Focus reaches the search action', 'WCAG 2.2 2.1.1 Keyboard', searchTab, searchTab.id === 'submit_search' ? 'pass' : 'fail');
  33  |     const searchNavigation = page.waitForURL('**/products?search=top', { timeout: 20000 });
  34  |     await page.keyboard.press('Enter');
  35  |     await searchNavigation;
  36  |     await expect(page.getByRole('heading', { name: 'Searched Products', exact: true })).toBeVisible();
  37  |     const cards = await page.locator(site.cards).evaluateAll(elements => elements.map(el => ({
  38  |       href: el.querySelector('a[href*="/product_details/"]')?.getAttribute('href') ?? '',
  39  |       name: el.querySelector('.productinfo p')?.textContent?.trim() ?? '',
  40  |       price: el.querySelector('.productinfo h2')?.textContent?.trim() ?? ''
  41  |     })));
  42  |     const first = cards.find(p => products.some(api => p.href === `/product_details/${api.id}`));
  43  |     expect(first, 'UI/API matching product prerequisite').toBeTruthy();
  44  |     const apiProduct = products.find(p => first!.href === `/product_details/${p.id}`)!;
  45  |     ledger.facts.searchResults = cards;
  46  |     ledger.record('J-SEARCH', 'top, Tab then Enter', 'Search shows relevant products and opens a matching detail page',
  47  |       'Assessment required journey; compare result IDs with live search API because top also matches category Tops & Shirts', { url: page.url(), count: cards.length, products: cards },
  48  |       cards.length > 0 && cards.length === products.length && cards.every(p => products.some(api => p.href === '/product_details/' + api.id)) ? 'pass' : 'fail',
  49  |       [await ledger.screenshot(page, 'search-results')]);
  50  |     await page.locator(`a[href="${first!.href}"]`).first().click();
  51  |     await page.waitForURL(`**${first!.href}`);
  52  |     const product = await detail(page);
  53  |     ledger.facts.product = product;
  54  |     await page.locator(site.quantity).scrollIntoViewIfNeeded();
  55  |     await page.locator(site.quantity).focus();
  56  |     const detailStructure = { quantity: await snapshotControl(page.locator(site.quantity)), add: await snapshotControl(page.locator(site.addButton)),
  57  |       axe: await axe(page, site.detail), layout: await layout(page, site.quantity) };
  58  |     ledger.facts.detailStructure = detailStructure;
  59  |     ledger.record('FE-DETAIL-AXE', site.detail, 'Scoped automated accessibility check completes without violations',
  60  |       'Automated WCAG check supplements keyboard inspection; incomplete/manual items are not asserted as passes', detailStructure.axe,
  61  |       detailStructure.axe.status === 'blocked' ? 'blocked' : detailStructure.axe.violations.length ? 'fail' : 'pass');
  62  |     ledger.record('FE-QUANTITY-NAME', { quantity: 3, url: page.url() }, 'Quantity input has an accessible name associated with its visible label',
  63  |       'WCAG 2.2 1.3.1 Info and Relationships; 4.1.2 Name, Role, Value', detailStructure.quantity,
  64  |       /spinbutton "Quantity:?"/.test(detailStructure.quantity.aria) ? 'pass' : 'fail', [await ledger.screenshot(page, 'detail-before-add')]);
  65  |     const detailLayout = detailStructure.layout;
  66  |     ledger.record('FE-DETAIL-LAYOUT', testInfo.project.use.viewport, 'Quantity and add controls are visible within viewport width without horizontal overflow',
  67  |       'Assessment mobile usability; WCAG 2.2 1.4.10 Reflow at the reviewed width', detailLayout,
  68  |       detailLayout.control?.withinWidth && !detailLayout.viewport.horizontalOverflow ? 'pass' : 'fail');
  69  |     const feedback = await addToCart(page, '3', true);
  70  |     ledger.facts.addFeedback = feedback;
  71  |     ledger.record('J-ADD-FEEDBACK', { product: product.name, quantity: 3, action: 'Tab from quantity then Enter' },
  72  |       'Keyboard activation adds item and confirms success', 'WCAG 2.2 2.1.1; assessment shopping behaviour', feedback,
  73  |       feedback.status === 200 && feedback.modalVisible && /added to cart/i.test(feedback.modalText ?? '') ? 'pass' : 'fail',
  74  |       [await ledger.screenshot(page, 'add-confirmation')]);
  75  |     const modal = page.locator(site.addModal);
  76  |     if (feedback.modalVisible) {
  77  |       const modalKeyboard = { before: await activeControl(page) };
  78  |       await page.keyboard.press('Tab');
  79  |       const afterTab = await activeControl(page);
  80  |       await page.keyboard.press('Shift+Tab');
  81  |       const afterShiftTab = await activeControl(page);
  82  |       ledger.record('FE-MODAL-KEYBOARD', 'Tab / Shift+Tab after add confirmation',
  83  |         'Keyboard focus remains reachable in the modal with suitable dialog semantics', 'WCAG 2.2 2.1.1; 2.4.3 Focus Order',
  84  |         { ...modalKeyboard, afterTab, afterShiftTab, dialogHtml: feedback.modalHtml },
  85  |         await page.evaluate(() => !!document.querySelector('#cartModal')?.contains(document.activeElement)) ? 'pass' : 'fail');
  86  |     }
  87  |     await viewCart(page);
  88  |     const initialCart = await cart(page);
  89  |     const selectedRow = initialCart.find(r => r.id === `product-${apiProduct.id}`);
  90  |     expect(selectedRow, 'selected cart row prerequisite').toBeTruthy();
  91  |     ledger.facts.crossSurface = { api: apiProduct, search: first, detail: product, cart: selectedRow };
  92  |     ledger.record('TECH-CROSS-SURFACE', { search: 'top', productId: apiProduct.id, quantity: 3 },
  93  |       'Product name and unit price agree across API/search/detail/cart; line total equals unit price × 3',
  94  |       'Assessment explicit comparison; integer minor-unit calculation', ledger.facts.crossSurface,
  95  |       sameName(apiProduct.name, first!.name, product.name, selectedRow!.name) && samePrice(apiProduct.price, first!.price, product.price, selectedRow!.price)
  96  |         && validLine(selectedRow!, 3) ? 'pass' : 'fail', [await ledger.screenshot(page, 'cart-quantity-three')]);
  97  |     await page.reload({ waitUntil: 'domcontentloaded' });
  98  |     const reloadedCart = await cart(page);
  99  |     ledger.record('J-CART-RELOAD', 'reload cart', 'Cart preserves selected product and quantity across refresh',
  100 |       'Ordinary shopping expectation; session-level only', reloadedCart,
  101 |       reloadedCart.length === initialCart.length && JSON.stringify(reloadedCart.map(({ html, ...r }) => r)) === JSON.stringify(initialCart.map(({ html, ...r }) => r)) ? 'pass' : 'fail');
  102 |     await navigate(page, '/products');
  103 |     await page.locator('.left-sidebar a[href="#Women"]').click();
  104 |     const category = page.locator('#Women a').filter({ hasText: /^Tops$/ });
> 105 |     await category.click();
      |                    ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  106 |     await page.waitForURL('**/category_products/**');
  107 |     const categoryData = { url: page.url(), heading: await page.locator('.features_items h2.title').innerText(),
  108 |       productCount: await page.locator(site.cards).count() };
  109 |     ledger.record('J-BROWSE', 'Women → Tops', 'Category browse shows products with usable detail links', 'Assessment browsing journey', categoryData,
  110 |       categoryData.productCount > 0 && /tops/i.test(categoryData.heading) ? 'pass' : 'fail', [await ledger.screenshot(page, 'browse-category')]);
  111 |     const secondLink = page.locator(`a[href*="/product_details/"]:not([href="${first!.href}"])`).first();
  112 |     const secondPath = await secondLink.getAttribute('href');
  113 |     expect(secondPath, 'distinct second product prerequisite').toBeTruthy();
  114 |     await secondLink.click();
  115 |     await page.waitForURL(`**${secondPath}`);
  116 |     const secondProduct = await detail(page);
  117 |     await addToCart(page, '1');
  118 |     await viewCart(page);
  119 |     const twoItemCart = await cart(page);
  120 |     const secondId = secondPath!.split('/').pop();
  121 |     const secondRow = twoItemCart.find(r => r.id === `product-${secondId}`);
  122 |     ledger.record('J-CART-TWO', { first: apiProduct.name, second: secondProduct.name, quantities: [3, 1] },
  123 |       'Both distinct items and their line totals appear', 'Shopping expectation; decimal-safe arithmetic', twoItemCart,
  124 |       twoItemCart.length === 2 && !!secondRow && validLine(secondRow, 1) && twoItemCart.some(r => r.id === `product-${apiProduct.id}` && validLine(r, 3)) ? 'pass' : 'fail',
  125 |       [await ledger.screenshot(page, 'cart-two-products')]);
  126 |     const cartLayout = await layout(page, '#cart_info_table');
  127 |     ledger.record('FE-CART-LAYOUT', testInfo.project.use.viewport, 'Cart price, quantity, total and removal remain readable and operable',
  128 |       'Assessment mobile journey; horizontal table scrolling is assessed as usability rather than automatically a WCAG defect', cartLayout,
  129 |       cartLayout.control?.withinWidth && !cartLayout.viewport.horizontalOverflow ? 'pass' : 'fail');
  130 |     await page.locator(`#product-${secondId} .cart_quantity_delete`).click();
  131 |     await page.locator(`#product-${secondId}`).waitFor({ state: 'detached' });
  132 |     const afterRemoval = await cart(page);
  133 |     ledger.record('J-REMOVE', `Remove ${secondProduct.name}`, 'Only the chosen item is removed; remaining item and quantity are unchanged',
  134 |       'Assessment cart removal', afterRemoval,
  135 |       afterRemoval.length === 1 && afterRemoval[0].id === `product-${apiProduct.id}` && validLine(afterRemoval[0], 3) ? 'pass' : 'fail');
  136 |     await page.getByText('Proceed To Checkout', { exact: true }).click();
  137 |     await page.locator(site.guestModal).waitFor({ state: 'visible' });
  138 |     const gate = { text: await page.locator(site.guestModal).innerText(), html: await page.locator(site.guestModal).evaluate(el => el.outerHTML) };
  139 |     ledger.record('J-GUEST-CHECKOUT', 'Proceed To Checkout as guest', 'Guest is directed to account entry before checkout',
  140 |       'Observed site account requirement; not a claim that guest checkout is required', gate,
  141 |       /Register.*Login/i.test(gate.text) ? 'pass' : 'fail', [await ledger.screenshot(page, 'guest-checkout-gate')]);
  142 |     await page.locator(site.guestModal).getByRole('link', { name: 'Register / Login' }).click();
  143 |     await page.waitForURL('**/login');
  144 |     await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  145 |     ledger.record('J-ACCOUNT-ENTRY', 'Follow guest Register / Login', 'Login and registration entry points are available', 'Assessment account entry',
  146 |       { url: page.url(), loginHeading: await page.getByRole('heading', { name: 'Login to your account' }).innerText(),
  147 |         signupHeading: await page.getByRole('heading', { name: 'New User Signup!' }).innerText() }, 'pass', [await ledger.screenshot(page, 'account-entry')]);
  148 |     await emptyCart(page);
  149 |     const emptyState = { rows: await cart(page), text: await page.locator('#cart_items').innerText() };
  150 |     ledger.record('J-EMPTY-CART', 'Remove all guest items', 'Empty cart explains state and provides shopping onward action', 'Shopping expectation', emptyState,
  151 |       emptyState.rows.length === 0 && /empty/i.test(emptyState.text) ? 'pass' : 'fail', [await ledger.screenshot(page, 'empty-cart')]);
  152 |   } catch (error) {
  153 |     ledger.record('J-EXECUTION', 'current phase', 'All planned journey checks execute', 'Automation prerequisite', errorSummary(error), 'blocked');
  154 |     throw error;
  155 |   } finally { await ledger.save(); }
  156 | });
  157 | 
  158 | 
  159 | 
```