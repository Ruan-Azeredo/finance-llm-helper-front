import React, { useState } from 'react';
import axios from 'axios';
import LayoutContainer from './LayoutContainer';
import InputCategory from './components/InputCategory';
import BadgeCategory from './components/BadgeCategory';
import TransactionsTable from './components/TransactionsTable';
import FileUpload from './components/FileUpload';
import { default_categories } from './default_categories';
import AwaitModal from './components/AwaitModal';

function App() {

  const [transactions, setTransactions] = useState(null)
  const [analyzeReqSended, setAnalyzeReqSended] = useState(false)

  const Categories = ({ categories }) => {
    return (
      <>
        <InputCategory/>
        <div className='mt-4 flex flex-wrap gap-1'>
          {default_categories.map((category) => (
            <BadgeCategory key={category} category={category}/>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='w-full h-full bg-white'>
      <LayoutContainer categories={<Categories/>} chart={<div>graphic</div>}>

        {transactions ? (
          <TransactionsTable transactions={transactions}/>
        ) : (
          <>
            <FileUpload setAnalyzeReqSended={setAnalyzeReqSended} setTransactions={setTransactions}/>
            {analyzeReqSended &&
              <AwaitModal/>
            }
          </>
        )
        }
      </LayoutContainer>

    </div>
  );
}

export default App;
