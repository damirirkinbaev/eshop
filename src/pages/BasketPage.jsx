import React, { useState } from 'react'
import OrdersGrid from '../components/grids/OrdersGrid'
import Button from '../components/ui/Button';
import { TbSquareMinusFilled } from 'react-icons/tb';
import { FaTrashAlt } from 'react-icons/fa';
import BasketCard from '../components/cards/BasketCard';
import Switch from '../components/ui/Switch'
import Price from '../components/helper/Price';
import { BiSolidCircleHalf } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { IoCheckbox } from 'react-icons/io5';
import { pickAll, removeAllPick } from '../features/counter/counterSlicer';

function BasketPage() {

  const basketCount = useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();

  const basket = useSelector((state)=>state.counter.basket)

  const allSumm = basket.reduce((acc, curr)=>acc +(curr.price*curr.count), 0);
  const discountSum = basket.reduce((acc, curr)=> 
    acc + ((curr.price *curr.count * curr.discount)/100)
  , 0);
  const summ = allSumm - discountSum;


  const count = basket?.length ?? 0;


  return (
    <section className=' px-32 py-6 w-full flex gap-8 flex-col min-h-screen items-start '>
      <h2 className='relative pr-8 text-7xl font-extrabold text-[#414141]'>
      Корзина
      <span className='bg-[#FF6633] font-normal rounded-sm px-2 py-1 text-white/95 text-sm absolute top-0 right-0'>{basketCount}</span>
      </h2>
      <div className="grid grid-cols-4 w-full gap-16 ">
        <div className="col-span-3 flex flex-col gap-4 items-start">

          <div className='flex flex-row justify-start items-center'> 
            <Button onClicked={()=>dispatch(pickAll())} title={`Выделить все`} className={` w-fit gap-2 hover:text-white hover:bg-[#FF6633]`} icon={<IoCheckbox size={30} fill='#70C05B' />}/>
            <Button onClicked={()=>{dispatch(removeAllPick()) ; }} title={`Удалить выбранные`} className={` group w-fit gap-2 text-[#FF6633] items-center hover:text-red-600 `} icon={<FaTrashAlt className=' opacity-0 group-hover:opacity-100 transition delay-75 duration-150 '  size={20} fill='red' />}/>  
          </div>
          <div className='flex flex-col justify-start items-center gap-6'>

            {basket.map((x, i)=>(
              <BasketCard key={i} picked={x.picked} sum={x.sum} id={x.id} img={x.img} name={x.title} price={x.price} discount={x.discount} count={x.count} empty={x.empty}/>
            ))}
            
           
          </div>
    


        </div>
        <div className='flex flex-col items-start gap-6 justify-start pt-12 '>
            <div className='flex flex-row items-center gap-2 text-lg '> <Switch/> Списать <Price price={200}/> </div>
            <p className='w-full flex flex-row items-center gap-2 text-zinc-500'>На карте накоплено <Price price={200} /></p>
            <hr className=' text-[#F3F2F1] w-full'/>
            <div className=' flex flex-row w-full justify-between text-zinc-500'>
              <div className=' flex flex-col items-start gap-3'>
                <p>{count} товар{count > 4 ? "ов" :"а"}</p>
                <p>Скидка</p>
              </div>
              <div className=' flex flex-col items-start gap-3'>
                <Price price={allSumm.toFixed(2) ??0} className={`font-semibold text-zinc-800`} />
                <span className='text-[#FF6633] flex flex-row items-center font-bold'>-<Price price={discountSum.toFixed(2)??0} /></span>
              </div>

            </div>
            <hr className=' text-[#F3F2F1] w-full'/>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row w-full justify-between text-zinc-500'>
                  <p>Итог</p>
                  <Price className={`font-extrabold text-2xl text-zinc-800`} price={summ.toFixed(2)}/>
              
                </div>
                <div className=' flex flex-row items-center justify-center text-green-500 gap-4'>
                            <BiSolidCircleHalf size={18} className=' rotate-90' />
                              <p className='  text-xs '>Вы получаете <span className=' font-bold'>100 бонусов</span> </p>
                </div>
            </div>
            <Button className={`bg-[#FF6633] text-lg text-white/95 w-full hover:bg-green-500`} title={"Оформить заказ"}/>
        </div>

      </div>
  


    </section>
  )
}

export default BasketPage