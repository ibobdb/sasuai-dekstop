// Types for the cashier feature

// Common types
export type Discount = {
  id: string
  name: string
  code?: string
  description?: string
  type: 'FIXED_AMOUNT' | 'PERCENTAGE' // Updated from valueType
  value: number
  minPurchase: number
  startDate: string
  endDate: string
  isActive: boolean
  isGlobal?: boolean
  maxUses?: number
  usedCount?: number
  applyTo?: 'SPECIFIC_PRODUCTS' | 'ALL_PRODUCTS' | 'SPECIFIC_MEMBERS'
  createdAt?: string
  updatedAt?: string
}

// Product related types

export type Product = {
  id: string
  name: string
  price: number
  barcode?: string
  currentStock: number
  skuCode?: string
  unitId: string
  batches?: Array<{
    id: string
    buyPrice: number
    expiryDate: string
    remainingQuantity: number
  }>
  discounts?: Discount[] // New direct discounts array replacing discountRelationProduct
}

export type ProductResponse = {
  data: Array<
    Product & {
      barcode: string | null
      skuCode: string | null
      [key: string]: any
    }
  >
  success: boolean
}

// Cart related types
export type CartItem = Product & {
  quantity: number
  subtotal: number
  batchId?: string
  selectedDiscount?: Discount | null
  discountAmount: number
  finalPrice: number
  // unitId is inherited from Product
}

// Member related types
export type Member = {
  id: string
  name: string
  phone: string
  email: string | null
  address: string | null
  tierId: string | null
  totalPoints: number
  totalPointsEarned: number
  joinDate: string
  isBanned?: boolean
  banReason?: string
  tier: {
    name?: string
    level?: string
    multiplier?: number
    discounts?: Discount[] // Add tier discounts
  } | null
  cardId?: string | null
  discounts?: Discount[] // Direct member discounts
}

export type MemberResponse = {
  data: {
    members: Member[]
    totalCount: number
    totalPages: number
    currentPage: number
  }
  success: boolean
}

// Payment related types
export type PaymentMethod = 'cash' | 'debit' | 'e-wallet' | 'qris' | 'transfer' | 'other'

export type TransactionItem = {
  productId: string
  quantity: number
  unitId: string
  cost: number
  pricePerUnit: number
  subtotal: number
  batchId: string
  discountId: string | null
}

export type TransactionData = {
  cashierId: string
  memberId?: string | null
  selectedMemberDiscountId?: string | null
  selectedTierDiscountId?: string | null // Add this field for tier discounts
  globalDiscountCode?: string | null
  totalAmount: number
  finalAmount: number
  paymentMethod: PaymentMethod
  cashAmount?: number
  items: TransactionItem[]
}

// Component props types
export type TransactionSummaryProps = {
  itemCount: number
  subtotal: number
  productDiscounts: number
  memberDiscount: number
  tierDiscount: number // Add this field for tier discounts
  globalDiscount: number
  tax: number
  total: number
  pointsToEarn?: number // Points that will be earned from this transaction
  memberTier?: {
    name: string
    multiplier: number
  } | null // Member tier information with multiplier
}

export type ProductSearchProps = {
  onProductSelect: (product: Product) => void
  autoFocus?: boolean
}

export type CartListProps = {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onUpdateDiscount: (id: string, discount: Discount | null) => void
}

export type MemberSectionProps = {
  onMemberSelect?: (member: Member | null) => void
  onMemberDiscountSelect?: (discount: Discount | null) => void
  selectedDiscount: Discount | null
  subtotal?: number
  member: Member | null
}

export type PaymentSectionProps = {
  total: number
  paymentMethod: PaymentMethod
  paymentAmount: number
  change: number
  onPaymentMethodChange: (method: PaymentMethod) => void
  onPaymentAmountChange: (amount: number) => void
}

export type ActionButtonsProps = {
  onPay: () => Promise<void>
  onClear: () => void
  onPrint: () => void
  isPayEnabled: boolean
  isPrintEnabled: boolean
}

export type CreateMemberDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (member: Member) => void
}
