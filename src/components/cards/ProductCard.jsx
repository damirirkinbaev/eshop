import React from 'react'
import { CiHeart } from 'react-icons/ci'
import FiveStars from '../ui/FiveStars'
import Button from '../ui/Button'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import { LuShoppingCart } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket} from '../../features/counter/counterSlicer'

function ProductCard({price, priceOriginal, title, img, discount, id, count}) {

  let {catalogId} = useParams();

const basket = useSelector((state)=>state.counter.basket)

  const dispatch = useDispatch();

  const insist = basket.find(x=>x.id === id);


  function clickToProduct(){
    if(insist){
      dispatch(removeFromBasket({id}))
    }else{
      dispatch(addToBasket({price, priceOriginal, title, img, discount, id, count:1})); 
      console.log(basket);
    }
  }

  return (
    <div className=' rounded-md min-h-[349px] gap-0.5 w-[272px] p-4 bg-white hover:shadow-md transition justify-between duration-200 delay-75 flex flex-col'>
      <div className=' relative'>
        {count && <div className='flex flex-row items-center gap-2 absolute left-1 top-1'>
        <LuShoppingCart size={26} />
        <p className='font-semibold'>{count}</p>
        </div> }

        
       
        <img src={img}/>
        
       
       
      <CiHeart size={26} className='hover:fill-[#FF6633] cursor-pointer absolute right-1 top-1'/>
      {discount && <div className='absolute flex flex-row items-center justify-center px-3 py-1.5 left-1 bottom-1 text-white bg-[#FF6633] w-fit rounded-sm'>
      <p>-{discount}%</p>
      </div>}
      
      </div>
      <div className='flex flex-col justify-between gap-4 items-start h-max '>

        <div className='flex flex-row justify-between items-center w-full'>
          <div className=' text-start'>
          <p className=' text-lg font-bold'>{price?.toFixed(2)} тг.</p>
          <p className=' text-xs font-light text-zinc-600 '>С картой</p>

          </div>
          <div className=' text-end'>
          <p className=' text-base font-light'>{priceOriginal?.toFixed(2)} тг.</p>

          <p className=' text-xs font-light text-zinc-600 '>Обычная</p>
          </div>
        
        
        </div>
        
        <div className='flex flex-col gap-y-2'>
        <Link to={`/catalogs/${catalogId}/${id}`} className=' hover:text-[#FF6633]'><p className=' line-clamp-2 text-start'>{title}</p></Link>
          
          <FiveStars/>
          <Button width={"lg"} onClicked={()=>clickToProduct()} title={insist ? "В корзине" : "Купить"} className={`hover:bg-[#FF6633] border-2  hover:border-[#FF6633] ${insist ? "bg-[#FF6633] text-white border-[#FF6633]":"bg-transparent border-green-400 text-green-400"} hover:text-white   `}/>

        </div>


      </div>


    </div>
  )
}

export default ProductCard