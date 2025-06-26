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

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  let response = {}

  try {
    const iapEmail = req.headers.get('X-Goog-Authenticated-User-Email')Add commentMore actions

    if (iapEmail) {
      // This is the normal, secure path when the app is running behind IAP.
      // It successfully found the header provided by IAP.
      response = {
      targetPrincipal: iapEmail,
      }
    } else {
            // --- START OF MODIFICATION ---Add commentMore actions
      // This 'else' block runs when IAP is not used and the header is missing.
      // Instead of throwing an error, we now provide a default user.
      // This allows the app to function in a public, unauthenticated mode for testing.

      console.warn('IAP header "X-Goog-Authenticated-User-Email" not found. Falling back to default user for public access.')

      response = {
        targetPrincipal: 'test-user@admazes.com', // A default user for your public setup. You can change this.
      }
      // --- END OF MODIFICATION ---
    }
  } catch (error) {
    // This catch block will now likely only catch unexpected errors, not the missing header.
    console.error('An unexpected error occurred during authentication:', error)
    response = { error: 'Authentication error', status: 500 }
  }

  return NextResponse.json(response)
}
