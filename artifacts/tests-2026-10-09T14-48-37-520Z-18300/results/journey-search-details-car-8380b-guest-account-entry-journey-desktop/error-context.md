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
- generic [ref=f46e1]:
  - banner [ref=f46e2]:
    - generic [ref=f46e5]:
      - link [ref=f46e8] [cursor=pointer]:
        - /url: /
        - img "Website for automation practice" [ref=f46e9]
      - list [ref=f46e12]:
        - listitem [ref=f46e13]:
          - link " Home" [ref=f46e14] [cursor=pointer]:
            - /url: /
            - generic [ref=f46e15]: 
            - text: Home
        - listitem [ref=f46e16]:
          - link " Products" [ref=f46e17] [cursor=pointer]:
            - /url: /products
            - generic [ref=f46e18]: 
            - text: Products
        - listitem [ref=f46e19]:
          - link " Cart" [ref=f46e20] [cursor=pointer]:
            - /url: /view_cart
            - generic [ref=f46e21]: 
            - text: Cart
        - listitem [ref=f46e22]:
          - link " Signup / Login" [ref=f46e23] [cursor=pointer]:
            - /url: /login
            - generic [ref=f46e24]: 
            - text: Signup / Login
        - listitem [ref=f46e25]:
          - link " Test Cases" [ref=f46e26] [cursor=pointer]:
            - /url: /test_cases
            - generic [ref=f46e27]: 
            - text: Test Cases
        - listitem [ref=f46e28]:
          - link " API Testing" [ref=f46e29] [cursor=pointer]:
            - /url: /api_list
            - generic [ref=f46e30]: 
            - text: API Testing
        - listitem [ref=f46e31]:
          - link " Video Tutorials" [ref=f46e32] [cursor=pointer]:
            - /url: https://www.youtube.com/c/AutomationExercise
            - generic [ref=f46e33]: 
            - text: Video Tutorials
        - listitem [ref=f46e34]:
          - link " Contact us" [ref=f46e35] [cursor=pointer]:
            - /url: /contact_us
            - generic [ref=f46e36]: 
            - text: Contact us
  - generic [ref=f46e38]:
    - img "Website for practice" [ref=f46e39]
    - textbox "Search Product" [ref=f46e40]
    - button "" [ref=f46e41] [cursor=pointer]
  - generic [ref=f46e45]:
    - generic [ref=f46e47]:
      - heading "Category" [level=2] [ref=f46e48]
      - generic [ref=f46e49]:
        - generic [ref=f46e50]:
          - heading [level=4] [ref=f46e52]:
            - link " Women" [active] [ref=f46e53] [cursor=pointer]:
              - /url: "#Women"
              - generic [ref=f46e54]: 
              - text: Women
          - list [ref=f46e58]:
            - listitem [ref=f46e59]:
              - link "Dress" [ref=f46e60] [cursor=pointer]:
                - /url: /category_products/1
            - listitem [ref=f46e61]:
              - link "Tops" [ref=f46e62] [cursor=pointer]:
                - /url: /category_products/2
            - listitem [ref=f46e63]:
              - link "Saree" [ref=f46e64] [cursor=pointer]:
                - /url: /category_products/7
        - heading [level=4] [ref=f46e67]:
          - link " Men" [ref=f46e68] [cursor=pointer]:
            - /url: "#Men"
            - generic [ref=f46e69]: 
            - text: Men
        - heading [level=4] [ref=f46e73]:
          - link " Kids" [ref=f46e74] [cursor=pointer]:
            - /url: "#Kids"
            - generic [ref=f46e75]: 
            - text: Kids
      - insertion [ref=f46e78]:
        - generic [ref=f46e81]:
          - heading "These are topics related to the article that might interest you" [level=2] [ref=f46e83]: Discover more
          - link "Online clothing store" [ref=f46e84] [cursor=pointer]
          - link "Website design services" [ref=f46e89] [cursor=pointer]
          - link "Credit card offers" [ref=f46e94] [cursor=pointer]
          - link "Newspaper subscription" [ref=f46e99] [cursor=pointer]
          - link "Men's Jeans" [ref=f46e104] [cursor=pointer]
          - link "Kids Clothing" [ref=f46e109] [cursor=pointer]
          - link "Polo Brand Clothing" [ref=f46e114] [cursor=pointer]
          - link "T SHIRT" [ref=f46e119] [cursor=pointer]
      - generic [ref=f46e124]:
        - heading "Brands" [level=2] [ref=f46e125]
        - list [ref=f46e127]:
          - listitem [ref=f46e128]:
            - link "(6) Polo" [ref=f46e129] [cursor=pointer]:
              - /url: /brand_products/Polo
              - generic [ref=f46e130]: (6)
              - text: Polo
          - listitem [ref=f46e131]:
            - link "(5) H&M" [ref=f46e132] [cursor=pointer]:
              - /url: /brand_products/H&M
              - generic [ref=f46e133]: (5)
              - text: H&M
          - listitem [ref=f46e134]:
            - link "(5) Madame" [ref=f46e135] [cursor=pointer]:
              - /url: /brand_products/Madame
              - generic [ref=f46e136]: (5)
              - text: Madame
          - listitem [ref=f46e137]:
            - link "(3) Mast & Harbour" [ref=f46e138] [cursor=pointer]:
              - /url: /brand_products/Mast & Harbour
              - generic [ref=f46e139]: (3)
              - text: Mast & Harbour
          - listitem [ref=f46e140]:
            - link "(4) Babyhug" [ref=f46e141] [cursor=pointer]:
              - /url: /brand_products/Babyhug
              - generic [ref=f46e142]: (4)
              - text: Babyhug
          - listitem [ref=f46e143]:
            - link "(3) Allen Solly Junior" [ref=f46e144] [cursor=pointer]:
              - /url: /brand_products/Allen Solly Junior
              - generic [ref=f46e145]: (3)
              - text: Allen Solly Junior
          - listitem [ref=f46e146]:
            - link "(3) Kookie Kids" [ref=f46e147] [cursor=pointer]:
              - /url: /brand_products/Kookie Kids
              - generic [ref=f46e148]: (3)
              - text: Kookie Kids
          - listitem [ref=f46e149]:
            - link "(5) Biba" [ref=f46e150] [cursor=pointer]:
              - /url: /brand_products/Biba
              - generic [ref=f46e151]: (5)
              - text: Biba
    - generic [ref=f46e153]:
      - heading "All Products" [level=2] [ref=f46e154]
      - generic [ref=f46e156]:
        - generic [ref=f46e157]:
          - generic [ref=f46e158]:
            - img "ecommerce website products" [ref=f46e159]
            - heading "Rs. 500" [level=2] [ref=f46e160]
            - paragraph [ref=f46e161]: Blue Top
            - generic [ref=f46e162] [cursor=pointer]:
              - generic [ref=f46e163]: 
              - text: Add to cart
          - generic [ref=f46e164]:
            - heading "Rs. 500" [level=2] [ref=f46e165]
            - paragraph [ref=f46e166]: Blue Top
            - generic [ref=f46e167] [cursor=pointer]:
              - generic [ref=f46e168]: 
              - text: Add to cart
        - list [ref=f46e170]:
          - listitem [ref=f46e171]:
            - link " View Product" [ref=f46e172] [cursor=pointer]:
              - /url: /product_details/1
              - generic [ref=f46e173]: 
              - text: View Product
      - generic [ref=f46e175]:
        - generic [ref=f46e176]:
          - generic [ref=f46e177]:
            - img "ecommerce website products" [ref=f46e178]
            - heading "Rs. 400" [level=2] [ref=f46e179]
            - paragraph [ref=f46e180]:
              - text: Men
              - link "Tshirt" [ref=f46e181] [cursor=pointer]:
                - /url: "#"
            - generic [ref=f46e184] [cursor=pointer]:
              - generic [ref=f46e185]: 
              - text: Add to cart
          - generic [ref=f46e186]:
            - heading "Rs. 400" [level=2] [ref=f46e187]
            - paragraph [ref=f46e188]: Men Tshirt
            - generic [ref=f46e189] [cursor=pointer]:
              - generic [ref=f46e190]: 
              - text: Add to cart
        - list [ref=f46e192]:
          - listitem [ref=f46e193]:
            - link " View Product" [ref=f46e194] [cursor=pointer]:
              - /url: /product_details/2
              - generic [ref=f46e195]: 
              - text: View Product
      - generic [ref=f46e197]:
        - generic [ref=f46e198]:
          - generic [ref=f46e199]:
            - img "ecommerce website products" [ref=f46e200]
            - heading "Rs. 1000" [level=2] [ref=f46e201]
            - paragraph [ref=f46e202]:
              - text: Sleeveless
              - link "Dress" [ref=f46e203] [cursor=pointer]:
                - /url: "#"
            - generic [ref=f46e206] [cursor=pointer]:
              - generic [ref=f46e207]: 
              - text: Add to cart
          - generic [ref=f46e208]:
            - heading "Rs. 1000" [level=2] [ref=f46e209]
            - paragraph [ref=f46e210]: Sleeveless Dress
            - generic [ref=f46e211] [cursor=pointer]:
              - generic [ref=f46e212]: 
              - text: Add to cart
        - list [ref=f46e214]:
          - listitem [ref=f46e215]:
            - link " View Product" [ref=f46e216] [cursor=pointer]:
              - /url: /product_details/3
              - generic [ref=f46e217]: 
              - text: View Product
      - generic [ref=f46e219]:
        - generic [ref=f46e220]:
          - generic [ref=f46e221]:
            - img "ecommerce website products" [ref=f46e222]
            - heading "Rs. 1500" [level=2] [ref=f46e223]
            - paragraph [ref=f46e224]: Stylish Dress
            - generic [ref=f46e225] [cursor=pointer]:
              - generic [ref=f46e226]: 
              - text: Add to cart
          - generic [ref=f46e227]:
            - heading "Rs. 1500" [level=2] [ref=f46e228]
            - paragraph [ref=f46e229]: Stylish Dress
            - generic [ref=f46e230] [cursor=pointer]:
              - generic [ref=f46e231]: 
              - text: Add to cart
        - list [ref=f46e233]:
          - listitem [ref=f46e234]:
            - link " View Product" [ref=f46e235] [cursor=pointer]:
              - /url: /product_details/4
              - generic [ref=f46e236]: 
              - text: View Product
      - generic [ref=f46e238]:
        - generic [ref=f46e239]:
          - generic [ref=f46e240]:
            - img "ecommerce website products" [ref=f46e241]
            - heading "Rs. 600" [level=2] [ref=f46e242]
            - paragraph [ref=f46e243]: Winter Top
            - generic [ref=f46e244] [cursor=pointer]:
              - generic [ref=f46e245]: 
              - text: Add to cart
          - generic [ref=f46e246]:
            - heading "Rs. 600" [level=2] [ref=f46e247]
            - paragraph [ref=f46e248]: Winter Top
            - generic [ref=f46e249] [cursor=pointer]:
              - generic [ref=f46e250]: 
              - text: Add to cart
        - list [ref=f46e252]:
          - listitem [ref=f46e253]:
            - link " View Product" [ref=f46e254] [cursor=pointer]:
              - /url: /product_details/5
              - generic [ref=f46e255]: 
              - text: View Product
      - generic [ref=f46e257]:
        - generic [ref=f46e258]:
          - generic [ref=f46e259]:
            - img "ecommerce website products" [ref=f46e260]
            - heading "Rs. 400" [level=2] [ref=f46e261]
            - paragraph [ref=f46e262]: Summer White Top
            - generic [ref=f46e263] [cursor=pointer]:
              - generic [ref=f46e264]: 
              - text: Add to cart
          - generic [ref=f46e265]:
            - heading "Rs. 400" [level=2] [ref=f46e266]
            - paragraph [ref=f46e267]: Summer White Top
            - generic [ref=f46e268] [cursor=pointer]:
              - generic [ref=f46e269]: 
              - text: Add to cart
        - list [ref=f46e271]:
          - listitem [ref=f46e272]:
            - link " View Product" [ref=f46e273] [cursor=pointer]:
              - /url: /product_details/6
              - generic [ref=f46e274]: 
              - text: View Product
      - generic [ref=f46e276]:
        - generic [ref=f46e277]:
          - generic [ref=f46e278]:
            - img "ecommerce website products" [ref=f46e279]
            - heading "Rs. 1000" [level=2] [ref=f46e280]
            - paragraph [ref=f46e281]: Madame Top For Women
            - generic [ref=f46e282] [cursor=pointer]:
              - generic [ref=f46e283]: 
              - text: Add to cart
          - generic [ref=f46e284]:
            - heading "Rs. 1000" [level=2] [ref=f46e285]
            - paragraph [ref=f46e286]: Madame Top For Women
            - generic [ref=f46e287] [cursor=pointer]:
              - generic [ref=f46e288]: 
              - text: Add to cart
        - list [ref=f46e290]:
          - listitem [ref=f46e291]:
            - link " View Product" [ref=f46e292] [cursor=pointer]:
              - /url: /product_details/7
              - generic [ref=f46e293]: 
              - text: View Product
      - generic [ref=f46e295]:
        - generic [ref=f46e296]:
          - generic [ref=f46e297]:
            - img "ecommerce website products" [ref=f46e298]
            - heading "Rs. 700" [level=2] [ref=f46e299]
            - paragraph [ref=f46e300]: Fancy Green Top
            - generic [ref=f46e301] [cursor=pointer]:
              - generic [ref=f46e302]: 
              - text: Add to cart
          - generic [ref=f46e303]:
            - heading "Rs. 700" [level=2] [ref=f46e304]
            - paragraph [ref=f46e305]: Fancy Green Top
            - generic [ref=f46e306] [cursor=pointer]:
              - generic [ref=f46e307]: 
              - text: Add to cart
        - list [ref=f46e309]:
          - listitem [ref=f46e310]:
            - link " View Product" [ref=f46e311] [cursor=pointer]:
              - /url: /product_details/8
              - generic [ref=f46e312]: 
              - text: View Product
      - generic [ref=f46e314]:
        - generic [ref=f46e315]:
          - generic [ref=f46e316]:
            - img "ecommerce website products" [ref=f46e317]
            - heading "Rs. 499" [level=2] [ref=f46e318]
            - paragraph [ref=f46e319]:
              - text: Sleeves Printed Top - White
              - link "Read Economics" [ref=f46e320] [cursor=pointer]
            - generic [ref=f46e324] [cursor=pointer]:
              - generic [ref=f46e325]: 
              - text: Add to cart
          - generic [ref=f46e326]:
            - heading "Rs. 499" [level=2] [ref=f46e327]
            - paragraph [ref=f46e328]: Sleeves Printed Top - White
            - generic [ref=f46e329] [cursor=pointer]:
              - generic [ref=f46e330]: 
              - text: Add to cart
        - list [ref=f46e332]:
          - listitem [ref=f46e333]:
            - link " View Product" [ref=f46e334] [cursor=pointer]:
              - /url: /product_details/11
              - generic [ref=f46e335]: 
              - text: View Product
      - generic [ref=f46e337]:
        - generic [ref=f46e338]:
          - generic [ref=f46e339]:
            - img "ecommerce website products" [ref=f46e340]
            - heading "Rs. 359" [level=2] [ref=f46e341]
            - paragraph [ref=f46e342]: Half Sleeves Top Schiffli Detailing - Pink
            - generic [ref=f46e343] [cursor=pointer]:
              - generic [ref=f46e344]: 
              - text: Add to cart
          - generic [ref=f46e345]:
            - heading "Rs. 359" [level=2] [ref=f46e346]
            - paragraph [ref=f46e347]: Half Sleeves Top Schiffli Detailing - Pink
            - generic [ref=f46e348] [cursor=pointer]:
              - generic [ref=f46e349]: 
              - text: Add to cart
        - list [ref=f46e351]:
          - listitem [ref=f46e352]:
            - link " View Product" [ref=f46e353] [cursor=pointer]:
              - /url: /product_details/12
              - generic [ref=f46e354]: 
              - text: View Product
      - generic [ref=f46e356]:
        - generic [ref=f46e357]:
          - generic [ref=f46e358]:
            - img "ecommerce website products" [ref=f46e359]
            - heading "Rs. 278" [level=2] [ref=f46e360]
            - paragraph [ref=f46e361]: Frozen Tops For Kids
            - generic [ref=f46e362] [cursor=pointer]:
              - generic [ref=f46e363]: 
              - text: Add to cart
          - generic [ref=f46e364]:
            - heading "Rs. 278" [level=2] [ref=f46e365]
            - paragraph [ref=f46e366]: Frozen Tops For Kids
            - generic [ref=f46e367] [cursor=pointer]:
              - generic [ref=f46e368]: 
              - text: Add to cart
        - list [ref=f46e370]:
          - listitem [ref=f46e371]:
            - link " View Product" [ref=f46e372] [cursor=pointer]:
              - /url: /product_details/13
              - generic [ref=f46e373]: 
              - text: View Product
      - generic [ref=f46e375]:
        - generic [ref=f46e376]:
          - generic [ref=f46e377]:
            - img "ecommerce website products" [ref=f46e378]
            - heading "Rs. 679" [level=2] [ref=f46e379]
            - paragraph [ref=f46e380]: Full Sleeves Top Cherry - Pink
            - generic [ref=f46e381] [cursor=pointer]:
              - generic [ref=f46e382]: 
              - text: Add to cart
          - generic [ref=f46e383]:
            - heading "Rs. 679" [level=2] [ref=f46e384]
            - paragraph [ref=f46e385]: Full Sleeves Top Cherry - Pink
            - generic [ref=f46e386] [cursor=pointer]:
              - generic [ref=f46e387]: 
              - text: Add to cart
        - list [ref=f46e389]:
          - listitem [ref=f46e390]:
            - link " View Product" [ref=f46e391] [cursor=pointer]:
              - /url: /product_details/14
              - generic [ref=f46e392]: 
              - text: View Product
      - generic [ref=f46e394]:
        - generic [ref=f46e395]:
          - generic [ref=f46e396]:
            - img "ecommerce website products" [ref=f46e397]
            - heading "Rs. 315" [level=2] [ref=f46e398]
            - paragraph [ref=f46e399]:
              - text: Printed Off Shoulder Top - White
              - link "T-Shirts" [ref=f46e400] [cursor=pointer]
            - generic [ref=f46e404] [cursor=pointer]:
              - generic [ref=f46e405]: 
              - text: Add to cart
          - generic [ref=f46e406]:
            - heading "Rs. 315" [level=2] [ref=f46e407]
            - paragraph [ref=f46e408]: Printed Off Shoulder Top - White
            - generic [ref=f46e409] [cursor=pointer]:
              - generic [ref=f46e410]: 
              - text: Add to cart
        - list [ref=f46e412]:
          - listitem [ref=f46e413]:
            - link " View Product" [ref=f46e414] [cursor=pointer]:
              - /url: /product_details/15
              - generic [ref=f46e415]: 
              - text: View Product
      - generic [ref=f46e417]:
        - generic [ref=f46e418]:
          - generic [ref=f46e419]:
            - img "ecommerce website products" [ref=f46e420]
            - heading "Rs. 478" [level=2] [ref=f46e421]
            - paragraph [ref=f46e422]: Sleeves Top and Short - Blue & Pink
            - generic [ref=f46e423] [cursor=pointer]:
              - generic [ref=f46e424]: 
              - text: Add to cart
          - generic [ref=f46e425]:
            - heading "Rs. 478" [level=2] [ref=f46e426]
            - paragraph [ref=f46e427]: Sleeves Top and Short - Blue & Pink
            - generic [ref=f46e428] [cursor=pointer]:
              - generic [ref=f46e429]: 
              - text: Add to cart
        - list [ref=f46e431]:
          - listitem [ref=f46e432]:
            - link " View Product" [ref=f46e433] [cursor=pointer]:
              - /url: /product_details/16
              - generic [ref=f46e434]: 
              - text: View Product
      - generic [ref=f46e436]:
        - generic [ref=f46e437]:
          - generic [ref=f46e438]:
            - img "ecommerce website products" [ref=f46e439]
            - heading "Rs. 1200" [level=2] [ref=f46e440]
            - paragraph [ref=f46e441]: Little Girls Mr. Panda Shirt
            - generic [ref=f46e442] [cursor=pointer]:
              - generic [ref=f46e443]: 
              - text: Add to cart
          - generic [ref=f46e444]:
            - heading "Rs. 1200" [level=2] [ref=f46e445]
            - paragraph [ref=f46e446]: Little Girls Mr. Panda Shirt
            - generic [ref=f46e447] [cursor=pointer]:
              - generic [ref=f46e448]: 
              - text: Add to cart
        - list [ref=f46e450]:
          - listitem [ref=f46e451]:
            - link " View Product" [ref=f46e452] [cursor=pointer]:
              - /url: /product_details/18
              - generic [ref=f46e453]: 
              - text: View Product
      - generic [ref=f46e455]:
        - generic [ref=f46e456]:
          - generic [ref=f46e457]:
            - img "ecommerce website products" [ref=f46e458]
            - heading "Rs. 1050" [level=2] [ref=f46e459]
            - paragraph [ref=f46e460]:
              - text: Sleeveless Unicorn Patch Gown - Pink
              - link "Women's Dresses" [ref=f46e461] [cursor=pointer]
            - generic [ref=f46e465] [cursor=pointer]:
              - generic [ref=f46e466]: 
              - text: Add to cart
          - generic [ref=f46e467]:
            - heading "Rs. 1050" [level=2] [ref=f46e468]
            - paragraph [ref=f46e469]: Sleeveless Unicorn Patch Gown - Pink
            - generic [ref=f46e470] [cursor=pointer]:
              - generic [ref=f46e471]: 
              - text: Add to cart
        - list [ref=f46e473]:
          - listitem [ref=f46e474]:
            - link " View Product" [ref=f46e475] [cursor=pointer]:
              - /url: /product_details/19
              - generic [ref=f46e476]: 
              - text: View Product
      - generic [ref=f46e478]:
        - generic [ref=f46e479]:
          - generic [ref=f46e480]:
            - img "ecommerce website products" [ref=f46e481]
            - heading "Rs. 1190" [level=2] [ref=f46e482]
            - paragraph [ref=f46e483]: Cotton Mull Embroidered Dress
            - generic [ref=f46e484] [cursor=pointer]:
              - generic [ref=f46e485]: 
              - text: Add to cart
          - generic [ref=f46e486]:
            - heading "Rs. 1190" [level=2] [ref=f46e487]
            - paragraph [ref=f46e488]: Cotton Mull Embroidered Dress
            - generic [ref=f46e489] [cursor=pointer]:
              - generic [ref=f46e490]: 
              - text: Add to cart
        - list [ref=f46e492]:
          - listitem [ref=f46e493]:
            - link " View Product" [ref=f46e494] [cursor=pointer]:
              - /url: /product_details/20
              - generic [ref=f46e495]: 
              - text: View Product
      - generic [ref=f46e497]:
        - generic [ref=f46e498]:
          - generic [ref=f46e499]:
            - img "ecommerce website products" [ref=f46e500]
            - heading "Rs. 1530" [level=2] [ref=f46e501]
            - paragraph [ref=f46e502]: Blue Cotton Indie Mickey Dress
            - generic [ref=f46e503] [cursor=pointer]:
              - generic [ref=f46e504]: 
              - text: Add to cart
          - generic [ref=f46e505]:
            - heading "Rs. 1530" [level=2] [ref=f46e506]
            - paragraph [ref=f46e507]: Blue Cotton Indie Mickey Dress
            - generic [ref=f46e508] [cursor=pointer]:
              - generic [ref=f46e509]: 
              - text: Add to cart
        - list [ref=f46e511]:
          - listitem [ref=f46e512]:
            - link " View Product" [ref=f46e513] [cursor=pointer]:
              - /url: /product_details/21
              - generic [ref=f46e514]: 
              - text: View Product
      - generic [ref=f46e516]:
        - generic [ref=f46e517]:
          - generic [ref=f46e518]:
            - img "ecommerce website products" [ref=f46e519]
            - heading "Rs. 1600" [level=2] [ref=f46e520]
            - paragraph [ref=f46e521]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
            - generic [ref=f46e522] [cursor=pointer]:
              - generic [ref=f46e523]: 
              - text: Add to cart
          - generic [ref=f46e524]:
            - heading "Rs. 1600" [level=2] [ref=f46e525]
            - paragraph [ref=f46e526]: Long Maxi Tulle Fancy Dress Up Outfits -Pink
            - generic [ref=f46e527] [cursor=pointer]:
              - generic [ref=f46e528]: 
              - text: Add to cart
        - list [ref=f46e530]:
          - listitem [ref=f46e531]:
            - link " View Product" [ref=f46e532] [cursor=pointer]:
              - /url: /product_details/22
              - generic [ref=f46e533]: 
              - text: View Product
      - generic [ref=f46e535]:
        - generic [ref=f46e536]:
          - generic [ref=f46e537]:
            - img "ecommerce website products" [ref=f46e538]
            - heading "Rs. 1100" [level=2] [ref=f46e539]
            - paragraph [ref=f46e540]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=f46e541] [cursor=pointer]:
              - generic [ref=f46e542]: 
              - text: Add to cart
          - generic [ref=f46e543]:
            - heading "Rs. 1100" [level=2] [ref=f46e544]
            - paragraph [ref=f46e545]: Sleeveless Unicorn Print Fit & Flare Net Dress - Multi
            - generic [ref=f46e546] [cursor=pointer]:
              - generic [ref=f46e547]: 
              - text: Add to cart
        - list [ref=f46e549]:
          - listitem [ref=f46e550]:
            - link " View Product" [ref=f46e551] [cursor=pointer]:
              - /url: /product_details/23
              - generic [ref=f46e552]: 
              - text: View Product
      - generic [ref=f46e554]:
        - generic [ref=f46e555]:
          - generic [ref=f46e556]:
            - img "ecommerce website products" [ref=f46e557]
            - heading "Rs. 849" [level=2] [ref=f46e558]
            - paragraph [ref=f46e559]:
              - text: Colour Blocked Shirt – Sky Blue
              - link "Browse Clothing" [ref=f46e560] [cursor=pointer]
            - generic [ref=f46e564] [cursor=pointer]:
              - generic [ref=f46e565]: 
              - text: Add to cart
          - generic [ref=f46e566]:
            - heading "Rs. 849" [level=2] [ref=f46e567]
            - paragraph [ref=f46e568]: Colour Blocked Shirt – Sky Blue
            - generic [ref=f46e569] [cursor=pointer]:
              - generic [ref=f46e570]: 
              - text: Add to cart
        - list [ref=f46e572]:
          - listitem [ref=f46e573]:
            - link " View Product" [ref=f46e574] [cursor=pointer]:
              - /url: /product_details/24
              - generic [ref=f46e575]: 
              - text: View Product
      - generic [ref=f46e577]:
        - generic [ref=f46e578]:
          - generic [ref=f46e579]:
            - img "ecommerce website products" [ref=f46e580]
            - heading "Rs. 1299" [level=2] [ref=f46e581]
            - paragraph [ref=f46e582]:
              - text: Pure Cotton V-Neck
              - link "T-Shirt" [ref=f46e583] [cursor=pointer]:
                - /url: "#"
            - generic [ref=f46e586] [cursor=pointer]:
              - generic [ref=f46e587]: 
              - text: Add to cart
          - generic [ref=f46e588]:
            - heading "Rs. 1299" [level=2] [ref=f46e589]
            - paragraph [ref=f46e590]: Pure Cotton V-Neck T-Shirt
            - generic [ref=f46e591] [cursor=pointer]:
              - generic [ref=f46e592]: 
              - text: Add to cart
        - list [ref=f46e594]:
          - listitem [ref=f46e595]:
            - link " View Product" [ref=f46e596] [cursor=pointer]:
              - /url: /product_details/28
              - generic [ref=f46e597]: 
              - text: View Product
      - generic [ref=f46e599]:
        - generic [ref=f46e600]:
          - generic [ref=f46e601]:
            - img "ecommerce website products" [ref=f46e602]
            - heading "Rs. 1000" [level=2] [ref=f46e603]
            - paragraph [ref=f46e604]: Green Side Placket Detail T-Shirt
            - generic [ref=f46e605] [cursor=pointer]:
              - generic [ref=f46e606]: 
              - text: Add to cart
          - generic [ref=f46e607]:
            - heading "Rs. 1000" [level=2] [ref=f46e608]
            - paragraph [ref=f46e609]: Green Side Placket Detail T-Shirt
            - generic [ref=f46e610] [cursor=pointer]:
              - generic [ref=f46e611]: 
              - text: Add to cart
        - list [ref=f46e613]:
          - listitem [ref=f46e614]:
            - link " View Product" [ref=f46e615] [cursor=pointer]:
              - /url: /product_details/29
              - generic [ref=f46e616]: 
              - text: View Product
      - generic [ref=f46e618]:
        - generic [ref=f46e619]:
          - generic [ref=f46e620]:
            - img "ecommerce website products" [ref=f46e621]
            - heading "Rs. 1500" [level=2] [ref=f46e622]
            - paragraph [ref=f46e623]: Premium Polo T-Shirts
            - generic [ref=f46e624] [cursor=pointer]:
              - generic [ref=f46e625]: 
              - text: Add to cart
          - generic [ref=f46e626]:
            - heading "Rs. 1500" [level=2] [ref=f46e627]
            - paragraph [ref=f46e628]: Premium Polo T-Shirts
            - generic [ref=f46e629] [cursor=pointer]:
              - generic [ref=f46e630]: 
              - text: Add to cart
        - list [ref=f46e632]:
          - listitem [ref=f46e633]:
            - link " View Product" [ref=f46e634] [cursor=pointer]:
              - /url: /product_details/30
              - generic [ref=f46e635]: 
              - text: View Product
      - generic [ref=f46e637]:
        - generic [ref=f46e638]:
          - generic [ref=f46e639]:
            - img "ecommerce website products" [ref=f46e640]
            - heading "Rs. 850" [level=2] [ref=f46e641]
            - paragraph [ref=f46e642]: Pure Cotton Neon Green Tshirt
            - generic [ref=f46e643] [cursor=pointer]:
              - generic [ref=f46e644]: 
              - text: Add to cart
          - generic [ref=f46e645]:
            - heading "Rs. 850" [level=2] [ref=f46e646]
            - paragraph [ref=f46e647]: Pure Cotton Neon Green Tshirt
            - generic [ref=f46e648] [cursor=pointer]:
              - generic [ref=f46e649]: 
              - text: Add to cart
        - list [ref=f46e651]:
          - listitem [ref=f46e652]:
            - link " View Product" [ref=f46e653] [cursor=pointer]:
              - /url: /product_details/31
              - generic [ref=f46e654]: 
              - text: View Product
      - generic [ref=f46e656]:
        - generic [ref=f46e657]:
          - generic [ref=f46e658]:
            - img "ecommerce website products" [ref=f46e659]
            - heading "Rs. 799" [level=2] [ref=f46e660]
            - paragraph [ref=f46e661]: Soft Stretch Jeans
            - generic [ref=f46e662] [cursor=pointer]:
              - generic [ref=f46e663]: 
              - text: Add to cart
          - generic [ref=f46e664]:
            - heading "Rs. 799" [level=2] [ref=f46e665]
            - paragraph [ref=f46e666]: Soft Stretch Jeans
            - generic [ref=f46e667] [cursor=pointer]:
              - generic [ref=f46e668]: 
              - text: Add to cart
        - list [ref=f46e670]:
          - listitem [ref=f46e671]:
            - link " View Product" [ref=f46e672] [cursor=pointer]:
              - /url: /product_details/33
              - generic [ref=f46e673]: 
              - text: View Product
      - generic [ref=f46e675]:
        - generic [ref=f46e676]:
          - generic [ref=f46e677]:
            - img "ecommerce website products" [ref=f46e678]
            - heading "Rs. 1200" [level=2] [ref=f46e679]
            - paragraph [ref=f46e680]: Regular Fit Straight Jeans
            - generic [ref=f46e681] [cursor=pointer]:
              - generic [ref=f46e682]: 
              - text: Add to cart
          - generic [ref=f46e683]:
            - heading "Rs. 1200" [level=2] [ref=f46e684]
            - paragraph [ref=f46e685]: Regular Fit Straight Jeans
            - generic [ref=f46e686] [cursor=pointer]:
              - generic [ref=f46e687]: 
              - text: Add to cart
        - list [ref=f46e689]:
          - listitem [ref=f46e690]:
            - link " View Product" [ref=f46e691] [cursor=pointer]:
              - /url: /product_details/35
              - generic [ref=f46e692]: 
              - text: View Product
      - generic [ref=f46e694]:
        - generic [ref=f46e695]:
          - generic [ref=f46e696]:
            - img "ecommerce website products" [ref=f46e697]
            - heading "Rs. 1400" [level=2] [ref=f46e698]
            - paragraph [ref=f46e699]: Grunt Blue Slim Fit Jeans
            - generic [ref=f46e700] [cursor=pointer]:
              - generic [ref=f46e701]: 
              - text: Add to cart
          - generic [ref=f46e702]:
            - heading "Rs. 1400" [level=2] [ref=f46e703]
            - paragraph [ref=f46e704]: Grunt Blue Slim Fit Jeans
            - generic [ref=f46e705] [cursor=pointer]:
              - generic [ref=f46e706]: 
              - text: Add to cart
        - list [ref=f46e708]:
          - listitem [ref=f46e709]:
            - link " View Product" [ref=f46e710] [cursor=pointer]:
              - /url: /product_details/37
              - generic [ref=f46e711]: 
              - text: View Product
      - generic [ref=f46e713]:
        - generic [ref=f46e714]:
          - generic [ref=f46e715]:
            - img "ecommerce website products" [ref=f46e716]
            - heading "Rs. 2300" [level=2] [ref=f46e717]
            - paragraph [ref=f46e718]: Rose Pink Embroidered Maxi Dress
            - generic [ref=f46e719] [cursor=pointer]:
              - generic [ref=f46e720]: 
              - text: Add to cart
          - generic [ref=f46e721]:
            - heading "Rs. 2300" [level=2] [ref=f46e722]
            - paragraph [ref=f46e723]: Rose Pink Embroidered Maxi Dress
            - generic [ref=f46e724] [cursor=pointer]:
              - generic [ref=f46e725]: 
              - text: Add to cart
        - list [ref=f46e727]:
          - listitem [ref=f46e728]:
            - link " View Product" [ref=f46e729] [cursor=pointer]:
              - /url: /product_details/38
              - generic [ref=f46e730]: 
              - text: View Product
      - generic [ref=f46e732]:
        - generic [ref=f46e733]:
          - generic [ref=f46e734]:
            - img "ecommerce website products" [ref=f46e735]
            - heading "Rs. 3000" [level=2] [ref=f46e736]
            - paragraph [ref=f46e737]: Cotton Silk Hand Block Print Saree
            - generic [ref=f46e738] [cursor=pointer]:
              - generic [ref=f46e739]: 
              - text: Add to cart
          - generic [ref=f46e740]:
            - heading "Rs. 3000" [level=2] [ref=f46e741]
            - paragraph [ref=f46e742]: Cotton Silk Hand Block Print Saree
            - generic [ref=f46e743] [cursor=pointer]:
              - generic [ref=f46e744]: 
              - text: Add to cart
        - list [ref=f46e746]:
          - listitem [ref=f46e747]:
            - link " View Product" [ref=f46e748] [cursor=pointer]:
              - /url: /product_details/39
              - generic [ref=f46e749]: 
              - text: View Product
      - generic [ref=f46e751]:
        - generic [ref=f46e752]:
          - generic [ref=f46e753]:
            - img "ecommerce website products" [ref=f46e754]
            - heading "Rs. 3500" [level=2] [ref=f46e755]
            - paragraph [ref=f46e756]: Rust Red Linen Saree
            - generic [ref=f46e757] [cursor=pointer]:
              - generic [ref=f46e758]: 
              - text: Add to cart
          - generic [ref=f46e759]:
            - heading "Rs. 3500" [level=2] [ref=f46e760]
            - paragraph [ref=f46e761]: Rust Red Linen Saree
            - generic [ref=f46e762] [cursor=pointer]:
              - generic [ref=f46e763]: 
              - text: Add to cart
        - list [ref=f46e765]:
          - listitem [ref=f46e766]:
            - link " View Product" [ref=f46e767] [cursor=pointer]:
              - /url: /product_details/40
              - generic [ref=f46e768]: 
              - text: View Product
      - generic [ref=f46e770]:
        - generic [ref=f46e771]:
          - generic [ref=f46e772]:
            - img "ecommerce website products" [ref=f46e773]
            - heading "Rs. 5000" [level=2] [ref=f46e774]
            - paragraph [ref=f46e775]: Beautiful Peacock Blue Cotton Linen Saree
            - generic [ref=f46e776] [cursor=pointer]:
              - generic [ref=f46e777]: 
              - text: Add to cart
          - generic [ref=f46e778]:
            - heading "Rs. 5000" [level=2] [ref=f46e779]
            - paragraph [ref=f46e780]: Beautiful Peacock Blue Cotton Linen Saree
            - generic [ref=f46e781] [cursor=pointer]:
              - generic [ref=f46e782]: 
              - text: Add to cart
        - list [ref=f46e784]:
          - listitem [ref=f46e785]:
            - link " View Product" [ref=f46e786] [cursor=pointer]:
              - /url: /product_details/41
              - generic [ref=f46e787]: 
              - text: View Product
      - generic [ref=f46e789]:
        - generic [ref=f46e790]:
          - generic [ref=f46e791]:
            - img "ecommerce website products" [ref=f46e792]
            - heading "Rs. 1400" [level=2] [ref=f46e793]
            - paragraph [ref=f46e794]: Lace Top For Women
            - generic [ref=f46e795] [cursor=pointer]:
              - generic [ref=f46e796]: 
              - text: Add to cart
          - generic [ref=f46e797]:
            - heading "Rs. 1400" [level=2] [ref=f46e798]
            - paragraph [ref=f46e799]: Lace Top For Women
            - generic [ref=f46e800] [cursor=pointer]:
              - generic [ref=f46e801]: 
              - text: Add to cart
        - list [ref=f46e803]:
          - listitem [ref=f46e804]:
            - link " View Product" [ref=f46e805] [cursor=pointer]:
              - /url: /product_details/42
              - generic [ref=f46e806]: 
              - text: View Product
      - generic [ref=f46e808]:
        - generic [ref=f46e809]:
          - generic [ref=f46e810]:
            - img "ecommerce website products" [ref=f46e811]
            - heading "Rs. 1389" [level=2] [ref=f46e812]
            - paragraph [ref=f46e813]: GRAPHIC DESIGN MEN T SHIRT - BLUE
            - generic [ref=f46e814] [cursor=pointer]:
              - generic [ref=f46e815]: 
              - text: Add to cart
          - generic [ref=f46e816]:
            - heading "Rs. 1389" [level=2] [ref=f46e817]
            - paragraph [ref=f46e818]: GRAPHIC DESIGN MEN T SHIRT - BLUE
            - generic [ref=f46e819] [cursor=pointer]:
              - generic [ref=f46e820]: 
              - text: Add to cart
        - list [ref=f46e822]:
          - listitem [ref=f46e823]:
            - link " View Product" [ref=f46e824] [cursor=pointer]:
              - /url: /product_details/43
              - generic [ref=f46e825]: 
              - text: View Product
  - insertion [ref=f46e827]
  - contentinfo [ref=f46e829]:
    - generic [ref=f46e834]:
      - heading "Subscription" [level=2] [ref=f46e835]
      - generic [ref=f46e836]:
        - textbox "Your email address" [ref=f46e837]
        - button "" [ref=f46e838] [cursor=pointer]
        - paragraph [ref=f46e840]: Get the most recent updates from our site and be updated your self...
    - paragraph [ref=f46e844]: Copyright © 2021 All rights reserved
  - text: 
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