import React from 'react'
import { providers, signin } from 'next-auth/client'

export default ({ providers }) => {
  return (
    <>
      {Object.values(providers).map(provider => (
        <p key={provider.name}>
          <a href={provider.signinUrl} onClick={e => e.preventDefault()}>
            <button onClick={() => signin(provider.id)}>
              Sign in with {provider.name}
            </button>
          </a>
        </p>
      ))}
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(context),
    },
  }
}
