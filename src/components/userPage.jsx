import React from 'react';
import { useState } from '@hookstate/core';
import userState from '../state/userState';

const userPage = () => {
     const user = useState(userState);

};

export default userPage;