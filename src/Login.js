import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("Please Enter the full Name");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoURL: profilePic,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAB7CAMAAAB6t7bCAAAAz1BMVEX+/v7t7e0YFBEBWYf////s7Oz5+fnz8/MAAAD29vbw8PD7+/sAVoUGAAAAT30MBQDEw8IASnQoZYnn9/k2bo7R0M8eGxb3///f8PfD3uwATHa92enLysjt+v4YFBDY2NbJ5u+0tLJAdpaqqahfXlwkIR+IrcJNTEhyoLguLClhjqmApb1wb21XVlOcmppnZmNEQkCKiYeAfnykxtc3NTOenZ1GREIHWH9VhZ+Uus1HfZt2d3MGWoORkY67u7kAVX95mqqdwdNrla5Wiqnd6O/JchCmAAAU9UlEQVR4nO1dCXfbKtOWXGRJyIrctM7S2FJcO3HTek2dpDeL87b9/v9v+gAJGECS99Tx8Zxz72kwIIZHA7OBLGShlFw7IxfxMl5iB/QvWljlJTitQcowL/KzjpCltqPka+1QXrtAtLP4CEQ7l49ADqrKRyDb7RUzFifBjeMiXubwooCXVHmRzSuJUTl+cTvk8yJc0i4Q7eSgeJEYlODGqRqDckSlPWCGQro/3Byg2VluDtDsLDcHaHaWmwM0O8vNAZrd5WavmLGEau46GbmiiJc4QqWv8hJbqvS8SJoCZjufl0hTwDbaBaKdGJVb0q5qttsnZmzL5eQHVUZBVRRlJdXA1ytVZaVqoFeS7co6X7ld8aBK2707ZoSxS16KTMi4SDlgfeBFXBQRkHNexOXcAXLOi7icIyDnJe1sXlQ12xUPykLmoN4xMxKadZfulZfgnHbmoBZbuh2j3Ttm5gDNrjJjHaDZVWYO0OwuMwdoyphxNsBMzgwfpGZdZpx/y4wljB6gb6YmD9A3MS8C+qbRzueVsNkO6JvSEituZ/OiqtaO/AD0TW1QFjQr12bGTrExw2XQHBVTLM1RAY0wKwU0WauMGXsOM5Zh/VT9kiJfFG2hXU6lVdttaFC+3wJ0lpFR0lKLWnmVWqLoNFhsUAdHTRkzl9e/vn7m9FWQWbRQpbTo8fqitQgz++Xe3Jzn2SaDQqf/PRzVNk9HD9enaD4zB2iKoTn98bH2YSv08VuGzQGalaBBP1+3Awyho5+I7vMHaFZjpvW4JZkhVPt6yib+AM1KzJx92RoyHz58OUPzmDlAU8jM5cctQvPxcilonPncoHcDzfrMbBWaL5dohQUNeHF4iS2Na1GUq9SkJTntQC5qcTslF7VoUNC4Lh7UBph5Y6kxBwUdNQtYYmUWnF/SLscctYx2b21WljJjn29Vai7suczsl3tzU8wga+vQ4LnM7Bc0G/Q8/3NoDkGBAzT7As2GzNA3XNDS7XzvoaHeybeCZhNSwxSoKtB99xWao9eH4+Pj16O3gWYDUmMFjcngKr6f1B38T6DJSxHcAjS1428XZ63W2cWP4/XBKYTGgVJjmgKYU4kpwO0TGztPoRdWKpHndRs0wXEVu8ZmjxOV3tyuSdm1y+yao8fLU8ROW1qXv47W3XMWsmsCTj7mIdBZB5LjurhqVHKzAisZeHElJW+apN3xSiXtApEKjP0gsJUn1rExKJzTTnReFc8z2/miKGdQbl3lFA7KUr0BtcczIXbo7O+6cvPlci4zrulDs92BB6mOneIUYhT0vYogb0T9DVQy+PogHDW8JDeFGCUhfGIvxxe2gXxoY1BVfK9wOkNwUCo0x+dyobHQ5fG6UsMdNcXM5PnQ/G5YAdM9o9AULd2oGcagcjhDBUt3qfaGkhPQS5QDzXY8z7gXVfiD44pXR4Xuzdo3S6Efa4rNl+U8z4XQlPjR0S0QGlL59t1BAwZfAs3rBQJSY6GL5x2Bxi6CBllKXTKrTDD3DBqyeD1fSmTQBla07UsNQjo0/h5CQ8CB0FjvBJqRstdEg32UGkIP5yo058drIfMme83Qg9B4k83sNWIKdgUalgIjkVk722YJaJAljZ48DY3pxJYFLTg2RJRcKQtaI1OepeXHocmIQcP+g+aoITVclQTZm3ykwBxNu4LmqMGMy0eg5kOnzORAIwelami/TiE0rb8bU54LmbEtI+vW97vqgMkvfnFq7gsQG+92iTxjUBQ0TiC+PXu5fOgl85plu6oKzSyA7VS75hWIzQZS1D6eB/OY8fMcNQNlwM1yR43z5GXVI2/E/DSljpqcvGbfwU0Vmqpot+W8ZhWaNi501NRqx0J9RuhiXYtzxQC0CU3p0m1X22PPC4k5P+1k/s2l3ZsmNMYSvI0AdB40YlAaNB9qD/+dUScaOj3773XtyMBqQYEloSEvWrX5Mhrd1W1e699Bs5zneQloKDpHx39+//z535/jo9qHdWNqqwUFloaGr0zgUr59hIag8fp6RGgTwbS3kBrp+rRWj3KuB40IJsyHJt1G8IrQbJDeaEHjJVuAxhZqgCWDSJAb7LpO0mzU640GjS4ZzFggDZDpCUmj0WzQOMfyC9pCc57Wmhum/vhGC5qY4jnQpPoRxstIDcJJSs2M6iLZ07VdpzEcja9Sl/5N72mWuLhIajByZre9m4ioLCfT/l1ChrGy1NSMf+gVjujSVwLQAtAAqZGpwDnQmOFRybLQb7GLtSIW0UpfUEp2s15vzxKHFS0ETaAFjzyvJ6CpJkOqG4rBklmvdOsMefCepePEuN6PPabmx5U4Cr141MRLQVMjc/3KZpwSL83+zH7hNZ8f/3779u3P36/PRRsTh6YswGTJtUO8aAY0lnTiaJBipy2o0+nM2AOwX5dFnU4Ts7zmZNiL2eRG037bwVguhLYOjS8GFUyUoEPF63JukH934slwC6O4Enr9xLWxrS5o2E1GBDelrufd2jo0rnSx+1iF5vmbQllM4Fgp/EMda7XXXz/PTtkFwqety9+P+Yp2ttfIC4NlkrYoyjlmm+uoKbLgnBi+0mFqQ7WV93xEnlFtkrmJsrkhL+30zpXPy3PUZFT31Pkc4My3gWdjFTRR5WamWXBkmjo3aj+VmMgOsZAXdtR8+CyPxhL6lNqctcdPsLT1tfbh6PGCpRDwuT29+JUHDj0pwNaRYts65xDHcu5N5wa+tFfsnUZt2EHYJ0Nsn6gTGXmDplSUijzPpHc4d5VwnKRbPcZ3ofIL7Dp6Qcr6gKqT/Mpeb6r8WS8OQNc+nyHwOnNo1NKzr7XXb58UFzVhvXX9YGLzFp5nCE2lABpkvUTG3IQnHTwHGhSMFECjmwQxbrAzCfX+JMXeC9RbkP+kiYyoGKkiWRaAzofmWIPmizjbDMG5MCMIOwNNh82wui3EUTRj73YJNG0VmUodpdzg22yyY73bbMxtrjNTaCb5K5/ZqhSaTznQfNCg+fzNRIZ5Qw252RVomhUxj8pUXzVwGTQo0aaO5YQQbvAw6z/mm5cmlFnPNF3Fzd6LN4Hmf60cZMgPp9d6lsduQFO5OSnYFsJBmdQg3JPdxFQUsjN2bl3pz/OueoNx5Ck7epePs5rkPjxvhVsXGsvPR4bGd/TT1DsCTcFM0L47biE0+kLk3aV6D9mpp2C2w3iSUNaSzhQ8NA7bfJJ7+liiVJc0h7Q2NFYBMuSHi9ddhaaACAjF0DTBJh1XvAmPcroQMu++kX5XhJguIFkxTgWSFLe15SyKered+mzYjY0xrg9NHijp/1u/aitAs6Zdo0PD7BoTGrLre6YKG9HU0Hy7xhkrK9STUPwTWHXsCFMAOwPwWDZsx3YG6jO9cTsdYkCMUE1wSgPQi0OT+fxUGUK/X3Vo5ts1wm0os251b0AQuLwSSCFm5CYqNAmt6deNnTeMpoPb0bSi/eDdWiw/WfMGuKQXmLBb8UaYD8EHSYlxVPdJeZYPTQCGWCJaNFNfEm9EpJ315Pr2i/ameG0f5kOfrwQNss7Of16ct5D6AzpTA6NfzlN+QJJ2RjK5O++e5yV8aFiHhnrHXAMar9vEVRTgRDFUYvLW2/kBaFfRq7yeI92pN6I1QRaDQSGYShqNqbGpJ5cOXMGMQ1VwDRoMkrTtZaFJV6iz68/Pr8/Pjz81NVpb0b5cpMyU+tCM1W4pz3MeNLYOTRxOaMSbinrwov50kuRC4zbgEMKpI7K0FcyiVEcWtwE24S7UQPpOGF8lCGyqqj4xJwC9mNSg889pCLT2qhmfiOrPNQDN1oMCi0ATe09YuovVdE+anZ8nNbIWsU2pE4BDg0G6T9hNX38BTQChuSPjnqlCM2RbgGAmUE2e9aEBSZ2119/qTz8V0+YNQmmLQEP2anGjhoXqiiZNVWIDmoH14sWiVnRCk9syaDBMi/JefO3IFEiKC0fkb0VGoxtHgcb2HTjM9aFBp7/k/Ne+qr+dP+wgNMR6cWQwQdWZvIkJTdhX3AAxdc8IaGbSIInDYSOlhBNwV0ZjlvYLn9VHqtT4aLpovGY+NEi3XmjmGtiJzpaF5i0WtJsEgwA0flI2+L4JTWUKZ8zrIAgNlIP45Eoj0Ek0dZE7hQ5Mr53u1CslOy3iqDn9Axetox9QS0MtRUXbDamJBg7MDcDKAh92zSin6jsIU1uTQ9Nf1CNW8RLkQKGJvWTL0HxS3DFaLu7pCtCYCY9LZG/aBjS0kgJNOBIBaKqiYfXHQWBCo01xR1pihglZDk2i4JjZwyi1RZfM3lzIvflVgeZrSxEp0gRqaAtkb/oGVbWc58CsIkmHhnUwUz3Pau9NVaT8KilrlEATnThyBPZ4cWgaQUN51NSpaoMPtJxn5fe1odFWO1VqzssmNaXtO2rCPlIu1mpoq53hqDHmuMtuTk9f5iWgaap2K1UUteVhiZMCm4ZmuQC00Ck3Ha+xlEtSdGjsedAQDdvNluCloVH9bekWs8r5mi1Aw0qNnf6NQ2mrQKOGRJt4aWjiOHHb6oKW4AM0G5aaSthLcqEpaxRPHdxQQ3oHaDYBTaRkVMTebQZNAE76V+LIKyEGjaxLV7gDNOtDEw5mVzEsOqlnz+uDTL9w0qxTkhe3KOmKxOhS3Zdky3JUaKYHaJaEJqo42vndaJoduQYhzpg64JgBYN535LMkX2IFQW/ASJcaRzmIusPQ5KYIxgo0xtXIy0KTozyb0MQhMXPxvfrK36ZHY6HBGnZZeEVexKaHPzTfwUmawSNiMoHmmC5NEdw2NGJQEhpBMpKpQlMnP0hMxQtq5UPDCjWT02J5zfzF1qCxMbGtVGiY8x6peTPUKUC7hpFMFpOx0rzm9NYsjRn3TrumhVUSUhOoyNFkKjkJbwKNkHeYpC1meJ6jhqUxi/CosIwQuz7MdNTYcxw1FlbSmPN8aNHYx9SV0tWCxw1aasOdO+o52Ck7ZpuoOnjU5I4aZv3q4G/YUVMKzQaO2cbRhGypd8OM7sSOOxzSJKMF3JsZNPxNne9Dyw5x4IayE2S5Ze4Qup69ET3Zy7Q3BNeH7CVErupyo1keYlPFSS8HGj4JW4dmA0GBSqF2SnXRLUJju1qw2ntxbU3rimnSAVbPcjo2dukBUxZBUbqIK+GUyA2DBrv1qZb3s2PQzA8KFNLWocGObvrXqYioyRbhyW0io5yYHrVyGi99nsmhXgZC+o5vE3ZNX+PWyCk9QLMwNLYLNSiya4T3ZPnCatSYjCO8f6kntstAqd9NBiehd8IT2tUU0JjKmXfTfRpNQzPu80+gybaV1Ra0fweNETjznsgP6E6fVeoUqJwQSg+90flvcl3U0cSGOtdCJVlRaArLQ6PG/5eBRhwYDJovk5nLDgQ570hqSO96HGeGHXrqpuC8jPh/qmkzGpriASrDf64AzWNrPWiw0+23Z5P7JnL5LZzvRGpszTBh3mMiCeN5OdVeXzzPGRVgw/qDMrWK1KwJjdNrdybDenLf4B/4mXPP88LQrGjXwB8H+SegeTjJ0RXcPjUFEl25Mqa8x7mp2rRyjpQx4eq3YYLI3bJ2zerQpHYNngz9cf/lZtYYld7zDLwBi0GToCCwDG+AkWkc9gMLpPTmeAMC86o6nvZb1TPbvQ7pym3cz8neSJOv6fOIlnaTiw2VmQQeR6BJhXISrAW8AWtAc0lYtPwedscde/CCuglnGfhb5vjQioklqGzDhwYvePTtJw2EKGHraLccm2iGxfpAhCynMjFyorpLlGvh4abe0uV8aOtAQycPj5F7fzMdJ2jUyPGhzfM8F9JK0CzieVbu3iSbmSrD6ckZjDs3Xolwe0MJDRlkN6eud08kKwFhAW+4rOd5XWiq9647vhsNkdVNeN15QYE4JTHqWJAJjeRNHk73QLscaGRXIYemIjtXoLFxpgmIAXiT1FfgDKfyKgJIRJc+GdUBNORV7Fxp4HjRLSYvaJaRHrN7BCZvDI2FJp3qdJZcJYm4Q2QeNOKGBk7g0gZZlEJzBYtSUw/NeD3WpG9ZKjSgJy+DJgKde+q1qM7AU4fgZYsV0Sj6U2rI8EmPIlqrcn9bd8TtTVl0FDkvU2HNkIdd3SY0PYioGaDzUmjOTgFxk/NRKTWgyWuiQOPe1+8S1O50Z5aVIVEOTZKlEjfqnHhBowmKKNAokJWa5Pc0FuIo7ehhfwCNr3TeILNg8TLeyobQ4IR3zitlx5upFxw3h0/d8fSG0nQ8Ht2+1BOqZRnppgT+9tPg5iqqnNz0+u2EJr2SWcANwF9SDM2H57/fAf19TtP9jtVS9X4Atcl35T51Hq9pDCb1+t2ggxeKchrfDmHKAs+SggHFlGWh1LCAAevLBpVYGYRGuMGzSAX7frz6PNW1pJ0GwPxqqCp7PH35eTa6I55nZgIj0o+TNJrNJtPk+Swo0dGyT6bWjiDxQqVUvxwA/Fg7Uo+nc2hw0ul37xowXlMODa9m3nkG7rDi7cw7z+S9nKUXcjl6u2Xv1xRKDX8VbHkJcT4zrFZgLOu5zCzyydSVP88lo5zpwBc8Zrv6BbD85TPblX0Wtew2W7ek3ZZvs936h4YzZmw7nxk7J+f5QJSq24XmXM+/Nin3Q8MpkKXfsCqTjPJ7nrPOd+lDw3nM7MGHhsv3E2Mfes9fGNwoNKuE0g6fTD1A8x6g2cwHUleC5vB57nJotkUUGucgNStCc7n+lwOK6eGMRTUPUrMSNJ++b+KLwvl09L01lxkr744abqYDbpxFuJExGQHNIhZ/TjsJjR7GcEqvdZGDWp8ZnH4KZRuiU3u4YDNTzkzezU7SdcaDjYU3O+G8y4lWbeeKdmWDKrkMabPMuOaVmZtC5qeb8zyNmWC7jpqFzModddQQOv/1erR5eni8WISZnEMci7k37ZL9ZIP70MqfsdsIM6h1/vv6B6drTj9Kiq7nFl1f/J8vP/xWzMzKnuddh2YzzDBB4l/QFq96IL79LaWUFwmRzGmXfnkb41J95wDNWszwZqXMiHFKZniRK4IXB2jWYcbW270RMwdo3hM09j5Bs2Fm0kM7YEFLdyS1HYJXUYEplpOwk1LjLAuNMagd2mtWZWZhaDZrClDajwD0v2bGLj+DywmkAvOXQqRKwK836e1E5wu1cxdqZw5KthOV9oEZscvZSgA6k3OBNy8BL5PRDi7B/CU02gWmvOa0E4Oqmu3MQQHJ2Cdm/h+d0KtGXr3gkAAAAABJRU5ErkJggg=="
        alt="linkedin-img"
      />
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name (required if registering)"
          type="text"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URl (Optional)"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="Password"
        />

        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
