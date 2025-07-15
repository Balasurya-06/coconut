import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy, limit } from "firebase/firestore"
import { db } from "./firebase"

// Order interface
export interface Order {
  id?: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  products: {
    id: number
    name: string
    price: number
    quantity: number
    unit: string
  }[]
  total: number
  status: "pending" | "completed" | "cancelled"
  createdAt: string
  updatedAt: string
}

// Farm data interface
export interface FarmData {
  id?: string
  coconutsSold: number
  copraSold: number
  tenderCoconutsSold: number
  lastUpdated: string
}

// Market price interface
export interface MarketPrice {
  id?: string
  commodity: string
  price: number
  unit: string
  change: number
  market: string
  lastUpdated: string
}

// Orders functions
export const createOrder = async (orderData: Omit<Order, "id">) => {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const getOrders = async (customerId?: string) => {
  try {
    let q = query(collection(db, "orders"), orderBy("createdAt", "desc"))

    if (customerId) {
      q = query(collection(db, "orders"), where("customerId", "==", customerId), orderBy("createdAt", "desc"))
    }

    const querySnapshot = await getDocs(q)
    const orders: Order[] = []

    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order)
    })

    return orders
  } catch (error) {
    console.error("Error getting orders:", error)
    throw error
  }
}

export const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
  try {
    await updateDoc(doc(db, "orders", orderId), {
      status,
      updatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

// Farm data functions
export const updateFarmData = async (farmData: Omit<FarmData, "id">) => {
  try {
    const farmDocRef = doc(db, "farmData", "current")
    await updateDoc(farmDocRef, {
      ...farmData,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error updating farm data:", error)
    throw error
  }
}

export const getFarmData = async (): Promise<FarmData | null> => {
  try {
    const farmDoc = await getDocs(query(collection(db, "farmData"), limit(1)))
    if (!farmDoc.empty) {
      const data = farmDoc.docs[0].data()
      return { id: farmDoc.docs[0].id, ...data } as FarmData
    }
    return null
  } catch (error) {
    console.error("Error getting farm data:", error)
    throw error
  }
}

// Market prices functions
export const updateMarketPrices = async (prices: Omit<MarketPrice, "id">[]) => {
  try {
    const batch = prices.map(async (price) => {
      await addDoc(collection(db, "marketPrices"), {
        ...price,
        lastUpdated: new Date().toISOString(),
      })
    })
    await Promise.all(batch)
  } catch (error) {
    console.error("Error updating market prices:", error)
    throw error
  }
}

export const getLatestMarketPrices = async (): Promise<MarketPrice[]> => {
  try {
    const q = query(collection(db, "marketPrices"), orderBy("lastUpdated", "desc"), limit(10))
    const querySnapshot = await getDocs(q)
    const prices: MarketPrice[] = []

    querySnapshot.forEach((doc) => {
      prices.push({ id: doc.id, ...doc.data() } as MarketPrice)
    })

    return prices
  } catch (error) {
    console.error("Error getting market prices:", error)
    throw error
  }
}
