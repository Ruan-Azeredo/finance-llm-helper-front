import { Category } from "../schemas/Category"
import BadgeCategory from "./BadgeCategory"
import InputCategory from "./InputCategory"
import { categories_colors as colors } from "../components/const/colors"

const Categories = ({ categories }: { categories: Category[]}) => {
  return (
    <>
      <InputCategory/>
      <div className='mt-4 flex flex-wrap gap-2'>
        {categories.map((category) => (
          <BadgeCategory key={category.name} category={category} colorsList={colors}/>
        ))}
      </div>
    </>
  )
}

export default Categories