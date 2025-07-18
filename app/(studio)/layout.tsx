// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use client'

import TopNav from '../ui/transverse-components/SideNavigation' // Example path
import Box from '@mui/material/Box'

import Container from '@mui/material/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
return (

<Box sx={{ display: 'flex', flexDirection: 'column' }}>
<TopNav />

<Box component="main" sx={{ p: 3 }}>
{children}
</Box>
</Box>
)
}
