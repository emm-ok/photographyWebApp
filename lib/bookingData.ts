export type PackageType = "one-time" | "subscription"

export interface BookingPackage {
  _id: string
  name: string
  description: string
  price: string
  duration: string
  imageCount: number
  delivery: string
  type: PackageType
  featured?: boolean
  coverImage: string
}

// export const bookingPackages: BookingPackage[] = [
//   {
//     _id: "portrait-basic",
//     name: "Portrait Session",
//     description: "Perfect for individuals and personal branding.",
//     price: "₦80,000",
//     duration: "1 Hour",
//     imageCount: 10,
//     delivery: "7 Days",
//     type: "one-time",
//   },
//   {
//     _id: "event-standard",
//     name: "Event Coverage",
//     description: "Professional coverage for events & celebrations.",
//     price: "₦200,000",
//     duration: "4 Hours",
//     imageCount: 50,
//     delivery: "10 Days",
//     type: "one-time",
//     featured: true,
//   },
//   {
//     _id: "monthly-creator",
//     name: "Creator Plan",
//     description: "Ongoing content for creators & brands.",
//     price: "₦150,000 / month",
//     duration: "2 Sessions / month",
//     imageCount: 30,
//     delivery: "Ongoing",
//     type: "subscription",
//   },
// ]
