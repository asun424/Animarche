from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def createUrls(searchQuery, array):
    urls = ["https://store.crunchyroll.com/collections/shop?q=", "https://www.amiami.com/eng/search/list/?s_keywords=", "https://otakumode.com/search?category=&keyword=","https://www.rightstufanime.com/search?show=48&keywords="]
    for i in range(len(urls)):
        if " " not in searchQuery: 
            urls[i] = {"url": urls[i] + searchQuery, "collection": array}
        else:
            urls[i] = {"url": urls[i] + searchQuery[0:searchQuery.index(" ")]  + "%20" + searchQuery[searchQuery.index(" ") + 1:], "collection": array}

    return urls

class Scraper:
    def __init__(self, url, collection):
        self.url = url
        self.collection = collection
    def initalizeDriver(self):
        options = Options()
        options.add_argument("--headless=new")
        self.driver = webdriver.Chrome(service = ChromeService(ChromeDriverManager().install()),options=options)
    def scrape (self):
        self.driver.get(self.url)

        main = None 

        try:
            if "crunchyroll" in self.driver.current_url:
                main = WebDriverWait(self.driver, timeout=10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "prduct-card")))
            elif "amiami" in self.driver.current_url:
                main = WebDriverWait(self.driver, timeout=10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".newly-added-items__item.nomore")))
            elif "otakumode" in self.driver.current_url:
                main = WebDriverWait(self.driver, timeout=10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "p-product-list__item-inner")))
            elif "rightstuf" in self.driver.current_url:
                main = WebDriverWait(self.driver, timeout=10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "facets-item-cell-grid")))

            for elements in main:
                query = {}
                if "crunchyroll" in self.driver.current_url:
                    query["href"] = elements.find_element(By.TAG_NAME, "a").get_attribute("href")
                    query["img"] = elements.find_element(By.TAG_NAME, "img").get_attribute("src")
                    query["name"]  = elements.find_element(By.CSS_SELECTOR, ".product-card__title.small--hide").text
                    query["price"] = elements.find_element(By.CSS_SELECTOR, ".ss__price.ss-1xxlwm3").text
                    query["vendor"] = "Crunchyroll"
                elif "amiami" in self.driver.current_url:
                    subObj = elements.find_element(By.TAG_NAME, "img")
                    query["href"] = elements.find_element(By.TAG_NAME, "a").get_attribute("href")
                    query["img"] = subObj.get_attribute("src")
                    query["name"]  = subObj.get_attribute("title")
                    price = elements.find_element(By.CLASS_NAME, "newly-added-items__item__price").text
                    query["price"] = price[0: price.index(" ")] + " JPY"
                    query["vendor"] = "AmiAmi"
                elif "otakumode" in self.driver.current_url:
                    subObj = elements.find_element(By.TAG_NAME, "a")
                    query["href"] = subObj.get_attribute("href")
                    query["img"] = subObj.find_element(By.TAG_NAME, "img").get_attribute("data-src")
                    query["name"]  = subObj.get_attribute("title")
                    query["price"] =  elements.find_element(By.CLASS_NAME, "p-price__price").text
                    query["vendor"] = "Tokyo Otaku Mode"
                elif "rightstuf" in self.driver.current_url:
                    subObj = elements.find_element(By.TAG_NAME, "a")
                    query["href"] = subObj.get_attribute("href")
                    query["img"] = subObj.find_element(By.TAG_NAME, "img").get_attribute("src")
                    query["name"]  = subObj.find_element(By.CLASS_NAME, "facets-item-cell-grid-name").text
                    query["price"] =  elements.find_element(By.CLASS_NAME, "product-views-price-lead").text
                    query["vendor"] = "RightStuf"
                self.collection.append(query)
        except:
            self.driver.close()
            self.driver.quit()
        finally:
            self.driver.close()
            self.driver.quit()
        
        


def getCollection(object):
    scraper = Scraper(object["url"], object["collection"])
    scraper.initalizeDriver()
    scraper.scrape()