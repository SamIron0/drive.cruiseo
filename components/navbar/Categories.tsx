"use client"

import { CruiseoContext } from "@/context/context"
import CategoryBox from "../CategoryBox"
import Container from "../Container"
import { usePathname, useSearchParams } from "next/navigation"
import { useContext } from "react"
import { MdFlight } from "react-icons/md"
import { TbCar, TbMovie, TbSchool, TbShoppingCart } from "react-icons/tb"

export const categories = [
  {
    label: "Available",
    icon: TbSchool,
    description: "This property is in the countryside!"
  },
  {
    label: "Accepted",
    icon: TbMovie,
    description: "Wanna see a movie?!"
  }
]

const Categories = (onCategoryClick: any) => {
  const { activeCategory } = useContext(CruiseoContext)

  return (
    <Container>
      <div
        className="
        pt-4 mx-auto flex px-10 max-w-lg sm:px-24 md:px-44 lg:px-64 xl:px-80 flex-row items-center justify-center "
      >
        {categories.map((item, index) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={activeCategory === item.label}
            onCategoryClick={onCategoryClick}
            // Apply margin-right except for the last item
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
