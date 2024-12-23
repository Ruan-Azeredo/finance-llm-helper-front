import React, { useState } from 'react';
import axios from 'axios';
import LayoutContainer from './LayoutContainer';
import InputCategory from './components/InputCategory';
import BadgeCategory from './components/BadgeCategory';
import TransactionsTable from './components/TransactionsTable';
import FileUpload from './components/FileUpload';
import { default_categories } from './default_categories';
import AwaitModal from './components/AwaitModal';
import { StyledButton } from './components/micro/StyledButton';
import { InputText } from './components/micro/InputText';
import UploadFileButton from './components/UploadFileButton';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

function App() {

  return (
    <div className='w-full h-full bg-white'>
      <LayoutContainer/>

    </div>
  );
}

export default App;
