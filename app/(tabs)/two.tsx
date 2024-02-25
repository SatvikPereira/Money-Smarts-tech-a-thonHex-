import { Image, Pressable, Text, View } from 'react-native';

import Quiz from "../../components/mutualfunds/quiz"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Navigator, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuthentication } from '~/context/AuthContext';
import getDoument from '~/utils/firestore/getData';

export default function TabTwoScreen() {
  const { user } = useAuthentication();
  const [data, setData] = useState(null);
  const [quizedata, setquizeData] = useState([{name:"loading",img:"loading"}]);
  const Navigator = useNavigation()
  useEffect(() => {
    const unsubscribe = Navigator.addListener('state', (state) => {
    fetchQuiz()
  });

  return unsubscribe;
  }, [user]);

  async function fetchQuiz() {
    try {
      const result = await getDoument("users", user?.uid);
      setData(result.result?.data().quiz);
      setquizeData([
        {
          img: "https://img.freepik.com/premium-vector/finance-help-via-mutual-fund-business-concept-office-character-businessman-put-gold-coin-into-huge-glass-jar-with-green-sprout-light-bulb-grow-chart-wallet-cartoon-vector-illustration_87771-11136.jpg",
          name: "Mutual_Funds",
        },
        {
          img: "https://img.freepik.com/free-vector/candlestick-chart-showing-progress-growth-company-happy-business-characters-stock-market-forex-trade-performance-going-up-flat-vector-illustration-finances-economy-achievement-concept_74855-21685.jpg",
          name: "Stocks"
        },
        {
          img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO8AAADSCAMAAACVSmf4AAACClBMVEX///9LyvW15PT+tWaj3iy21B7kllb/8+XkycCUdoD/uWclADXCNDC1d1NZpMOvOjOgMjPJNjBAADKwnaxL0PuObXw1ACxLw+83Jld0TmVBACdGkr2YWUqmKTHj9fqtxCBCZpE3ACfHYhR+GTXknmBQITz25dmoKjK6MTGq4/OX3PUcACTHfU9PiaE6JU1WACvj0c66k5HUzNPt6+0fADB3HTWHSTu+r6+9pqryqWNaPVu8srtNGjuWf5FkJjxuVmn7ixLnfBhPKEuNdYzXk1s4F0OKORwzADN3MTDfkVZuVF2uaUhShKNKT3SCOS1WGzPLpZwhABspACI4AEGJwNRVMExqGCE7RHFLaaWuUR29YSNKADTBgVd7nrFVirspACxHQXbk85x31PU4OFmpiY9Qe7SJNyZKdJBMXoKdRiDR7vhJrtqOkSelaE/Yu7aazS57gZmpzeGOnLdcACuPVUp7Q0UVACAsAByOtC5ssMqEnzBFeaSjtCNnMTpxfTNIo8692DjS5XVvK0pVSG6OEClmNVV4LTthMj8UADKrgH9QK0G6bkRrSGo+T2xeNFxjbIljUnNMWI1QMC9ZRjFhXDNRF012bCqVoShLIC9xZS5QNi+FhClueDEvLmGUvy1hSyyYtstwVk6UhGdlRkqysHudkW2AbVu/wIXH3lamoXTQ5WvS24+cl1q6xF4WMQW8AAAaxUlEQVR4nO2di18Tx9rHsVyOJJC3LmGBEJSUIGpAucglEMIxJh1TbjUJh6MBox68YvACEREjesRyWn3Fqnhpa63UWq3n/R/fmdnbzO5ssglQqZ/8Pi3sLjuz893nmWeemd3EvLyccsopp5xyyimnnHLKKaeccsopp5xyyimnnHLK6RPUdqyP3Yo/R+fPfybr/KfOvP0ztc5/7CatQdu3n0fS9VQt7V+YePv5dBDnmbhQf0GvZrCoKNjG3RQmRn6Jm2E0nuhYjiydChdqQzgMabuq8SmY4ZhyHg0sBuyWBvejAatpdYlZJ+pjpMWFzvAxxmQdCE3/MgYrAxvAVa6FmP8c+BTNoq5tnFYEzuR8Gn4jI1lKjAy6ogY4o/ujufBGmTlNq84bO42hTG+QtoKPgCsBr8lW2WoDvNoAx/mPhfvZ+pvYkM9t/2i46w1ssIt9PNx1BTaYO2Su3XtOntyyZcvJkyf37Nm9DvUZTnBTaaNg9yBUQifXBXmt49OfRSsgf2ziDXNkFi0mXpfqsx2fNsy4OrRI62LirKJXBnnP7j0w8qCwY6i1esYVtCdbRkqZAxvGpbviybTtTY1rHHg3vMswruvc4kyBjeIyfDN12ElDaxCYvMlst8oQOGvaNC1OZ10jwNpwx7rFGQEbotUNs/omNoKbJmixr8q4Yga4hiJzqjCrY6OURYjGZ3NVTSHjw5Khzpum7cw2G8MV7pYU9OnumcJBNCY27NGpQXfjmJjWVCfp89M0ViWdqL87dSm1U63ZvGKGj1qQvs178Plyi/eka21KYeK0FaiADRpYj5aZ9KZqY7Zw7NqM3C+VS6/FvOvb+i1WqzXDEieNtCALAzODs8HIalBWa8VCbfVkxsjpdZJqtaEQvdHGtVonqwf/XVOyq/1O9eSW9Wamu3B27mwk0FgNasvk/J32XSXbtpWUbCvZVdc9P1lhuKghUV3YgENr3dkIbkV1rTF110HYEgi7TfhZsnj3rLGS85OGiCmPNuDQGl5DuKO2fSk1PT1t423Ti7sEzJKaum/qanaJyDV16G/T06mrsAUmjfDSBk7PqzGvgUtYF2w1JSnVsNje/rkIu6um7pC9MRiMJ9oXlUPTdQ2pq9hlq83cwJnzGglV1gXH4i59NdS1i8aEZIvtif5gkaBgaUc7xBRMLpyVohbbvLEuTBo4bQdWhyuDA9GgLRrlGEIHpwmkbzpKRVi3W0ButEPPFv8ObwYsEGVVFY3aKiuMtWXPGngN54ALo554qVr2JQ522RK5y0IvFmHzsQTmoN+eqFsU7F+y6/P2KOCS9ng8bicU9+6trjA6dK2B1/DAa6315psoucc6vqkRYXct1iXiKlgSuSjYT3Tmhrp99TPS2aI6Ro0P1Luz5jWeVkFemcNkyvfHlfgLvbRD7rIUrMQsIMP7Q3j+Pk+yvzE7XsKh0w5INK/xvErmhYb127+huuyY3GUZsBQy3ZmnuaV4Yxa8RITOzL4ZzOAEXuTFM9/ALlsijjKaLqsvAbnILwxTAnLNdFT07D+FN4O0GfdfZylqa4k88MT9KbyYhSx15o72xQa5M0c9cATLhHdLtrwZ4Fprh4ku20B02RRenMqzZ5Q+sQt2Zm40g5lFlrxG3RlP7/69SHRZxYszg6WR7fINRCPzIByQDCJnyatxZ/blhOndNmH8VHVZUxa4qJDk2bAz1+AOAqtvwBNI9h2nd3evC691cnQvSwEHkRIB4Kmvr/cg1a9NYhUgLGdYUc4BmC3YO0rPnbLkVd/F0X11m1T7RtfDvircivDitk2qxXDF2nnV4aqichp2pV01DQ0NNfJGA7FRAn8qGw018gY6u0FdrES7IZTXXkRTTHWoYTqwDrzqZNJazcOwVAfMZjOo21ayiDfaYRzBG/tgAzi4BTiYM0fRhhluTOO/LWqKTcOQa0YbHAxzAJ0NIME+/DcY59uFYtuUYjVmqRigq5zG161eh/6rSZ4rHDWwBfV+v99TB30IjPn9S+1wsDWP+Z2JfTBR5ux+vx3AWBqdcfpLzTD/n17y+8eEhvv9TtjwbTVmuOGdhmebS/3+GQ56ozkuFUvAYgBmGu31Tr/f/Dks5oFXq0fF0NWSqBgolaqEf3Mm0XVtNO568U462mFoqM83uT0wck0Dp8mUjNbVte+HGzMcDBug1GQqBWjDbjL5zfDsaNJkcoJpWAzAKRNAxf7jNpm8qJjZbzLZ0dlmVMwMN7gZWGw/KuaFmakZFfO4Tfn10tUSnFjMDcS/mRKopg3irQhwcIyIw+ExHvV4ojNwpCyFB6IJd77Jj4YPrzM/3+lFW35TvjsJT/KMwbMT6Ow4PBsXS5jyTWNoI0kUM6mKlcJiM+gkO3m1MXROEqUwM1KV+NBG8Vaiq5vyiTTCpMkU0mYYqcpnlZvkOzeUd9PJtMl4xfUOZY/awD/FY8pZGWlz8TrHsPwikn9sDG+4x8ac6PfYGIxIeBvOncW//ZV5YeQFeOwU1j/cZrAfxTAYh4EH/ca7/8HHlsz411+dF3CJRMILQMKE9wDwYl4zB4evfBMHIKMZ/UgCkBXupuONoo4ZBwDteUE9MLtFXnhE4U1ki7v5eFG4sgMPCqXA7AfYrn4zSJhhWiLxzmSNu+l4RX+GOMjK0JAegddpBm6J1wNAPNvBbrPxCvGKgxHa5AEzpjFgdiJec77dnBB5oW9zXDZrP5uRlxtrbBxbAtCY0JchNTIl5s2H3i3xQn9Ofir+jOKVH5jHoDtzHP5P4DWNmb0ewZ/jppmsPXqz8eJ4Bb3Yb+I47Nsc3MT2NQ0DZTzyYON/ArxcPB6H1gP50J1RAgVzDrvIi0YlkRdFsKj7E8g3hPzKDG2aQIxoEDabYX61H23CQzi/QkNU3GxO/OV58/3ouXC8FKbJpnhcGGL98bjbGY+jTXc8DlNn/CM/v1T8/ZfmJeZHxNyImBPlf1rzo43XRvJuRm0Qr7WiMqF5RWMzKM7VbtmA9djJgBhoN50AT7+Ltj68g7aGj/3cRE8NtsF150WPj1K/AffxpHqAtD68gbrNy1u3/rzWWltdQ81mVENDHf1u5TqNR2d5YAYxF6EYM4LFVOfsNy5NWVZ00pwCHFT3XS/eLZUzfs93LYSquHuNGsVd5fIJ3377bSipPUVXZNmWlgk+yah/mGrCV/y9sQ3MN8auFn8t61uXvYghLy+f0dKyFGtknaMnouzXX//K3wtqT+l30U1wb2h+lfDt/BvUVqQRL7PNjXwvOmUnPGPq26vMW6KrYKxYKru1y2Vn4BYVJQDRhOGijc0nnYAPQR2GCumZboY4x0M1OXivXyuqFrtcNhTyNDJ5GzmiCf3uDX5+lBzpgpqAGhlmNgc2CJSL5xSHOojj/cNXXUCj2FUH4QON+4ulsqBDp36lCd3R4AY/LzPZuyVn6k6wm1MU5CZEn2xx9StHk67yrmaGOnuBQ7GxXHbK1a/Da8d9CjWhKlm0wfNBU2m4WbjYVEA2S39HcjjZoaANl4ttnrgqgwRtvs7O4hHphfWyTmnL09fV3Kec562SyirRKhhPeIcTdumc/pjYhK0jHRvO6wcSLxAB+7lY+H7f/XCMk4iTcptDMkfS19w7+/LsmYFLl8bPDPyrtytWe0bQ/4b6mvtCElvivlTWIfIGE7HYSlXfA+DyCrU1uohbvtG8YyreYMJV1YrLtva5kkILk31Smw/LNnF19sZqm5qaxsfH4Q/EO98kavxfVc2+Dg2vaN9GDvS2ofrbylZicZrX86fy4osnQVlea2/Vg6re1rweIIxQ3j6NPw+Xd86KuONN403YvhLueFOsrOywaOCkircRPIAVH7z/oLysre2gK07x+v4EXrn/AtR/Z2I9eb2zfJjfy8/25vXEsJm8mv4bPNxV/HJexqV5m5rO1jfH+tV9AfMGow/aWu/PhsMgMMv15B1EY2Cj3H99G99/6XjVGOvNOzh7vHrANh5Znu3LK8Nj8nCxFJ8lXmiSke8HZFySF/l3k6O1287ktYPWVi78z4XB7sh492xP2wPoQffWN15duQNmZ8HDK+rXbCXenYozFXWstJXNfl9tQbxzZ2bL2nwJJm8/aOa+lzovxYtxm/jOvg5VfG5BvEHuYNvd8CmLZdAXiVjucK09rkZU2frx/rLieHTz+vWbjxxhVTUi7wrBGxw+2OY5fswyNw55LZFBrq03GqR475G8snkVXgGX5JX6QksI8t6LtfbM/tNimXvoi8zNzYGDbdCF15P3yuzzawVY1x7bzjJ44wpvB0yVe1pRcyKQ1xKZGwj19Lh0eWsVXIK3ScUrj91dMchr97X1BeD9jCz75iwRaOW2viTJm1gjb8/hJwWyrjtGK7S8cnIDb26jq7UMnILNGbedmpuzWEBvK+rANibvJQVX5h1PwRuC+VVHd9vd49WWSORh4FjEYjnjaD04XNQf3mmM93K6zx+1hghcaGLH8Yp0vL3hU3MRyDsPcS0BkbeXxSt3XpF3XsEleKPFKl7f8epIJLIcsMALDGDeuMzbrct7+dLDMJxWrPSm5A0/KiiggQetKl4leYU3F/Mei0SwPxO8Ug7cJeXPon0lXMm+0m4TUHh7NbzQvJGzPnQ/BV77Sjrey8u849HTC88uvAqttOnjHuQv0rzQpZVPoYq8I8TFMC80b2TAdorgjbJ4fSAAeGlSxE90hgA8IO9LvMEoNV9AvIOw/sgg7MWGea8Ax9MdhVg3+Pv63nz4ZoFaT3n5sxCM+RHiDcDWzA3Y/qnwKvMjkreTUqtqv1niJedHjZh3GV2A4lXmRyxe6yXHY5EW6sLhVj3eKocGt6Dg+XHavjMyb5XAC5aXl8+e5Y6fhQK6vPv70igg+jNfpua9gy7QDb6H9Q+qeRnzQWut40UhIb5M17zXGbzXHVJtOrw88bFkXs0bEnmDHWklZCZBvkvtz+TnnnnE25GK1zrveEriFg4f1O29DNyCgseVevZNCv78i2VO5c8OyUZfh5RJsTExeJcjMDST/tzRrc9rXeBfUbiFj/R4Q9rei2M0L1Yn8lapeWG6YVHxym0OUct1wXt2hmGpZYxgrFMqG5N44f1U8cpN8AZVvBWB5zRuoU1nSCoLqYOzqB+Op+QNn4KJAMXbqNgoRvLGHS7fiEa+WIhYqKJ4i9x4PFqAQxHJm6B4qfUray1/Q8Wr13/v/8DGLbgOhBAt8CYIXrcT8eJEQI9XWa8LJl1VXVNbNZqaKo7ZlGUfF8kLR4M23yi8nzSv3ITyYZrXOgmeqnBvhNjxuY0ZrZAuit8EocMbQKAGeJOxlq3lPodNkIMXN2yevqkpDx/U8oK4wLtsUfP26fIO2naoeC8cZiccPXruXFDwpHILk9cr2PeYllduMy+7qv1q1xQ4/YWoA+cOHZC2vwxNTIGkPi/Mn1PwkuvP1kn+RxVu4Y8xnej8XA8XObTMm69crG+4CPOe0vCGpqRnBEDqv8FY+VZw5MCR04KGjhw6NyRsnjvwxWyXnGgH90/JvPb0vB6aV2vewp8Amxf8pMt7URiCxfX2cuXmFunYl+TNFz7A3H91qvz0gUMv0aLkpTNnwJGhoVG8fWl5+Isjga1cwjhvUuYtjlK8k0Bj3sKnbF797gv16PsMeZspXqTEytbYF0fQEhaeJPBHhk7XDgjrWWeGDti6ih0Cb6PCy2XKC1MNjXn17NsT0+2+BQUvKlPwglGU6JH5JMHLi7wmb1+z48A/BESRV17PAgeGJibEBWiFd6unQ+CtHIQ17yXySYKXo+xb+UqDW/gjm7eXlTtLuolfFxB4vQqvDfPyIBAIcBz8CQJCPimsl+I2B2Te8uZ9f//HqQFxDijwigsegQOnFd6YXBYtPiJeVD++ABcQ8knllk/wBC8cjC5oeS+4mLwPXqXgFQIW5nUPyxcrtgXJeAW9bg75s99N8na4Kd5qS6SJ4m1KwZsQeI8fk/x5Dvmz163HO6+NVoWFz9jjEc9OJgX9zC9YZd5eovPQ8TmC+6/f5L+6U/FJFW8ETdstQv+V1rNI3nsK74jEK/XfOYE3X4/3JcOdC58x842U4QoG6AXZvp5eovNQ8QpmuRpen4p3DuNaLNzRodPy8h3FC/R5IxaNfWMEb0VYG50LC3eEehi8raGfU/HiGgVevP4gXIzmRSgir0vhTVC8x0RcCxB4YXceGBggefsV3m4VL3QNgddbLDWhheC1LoBnDF52/lwWSoGrx8uTvPMRS1reoSVJ3qND59CvpWTSuzTM5kWTPYK3Wlyv8xJdqovkrWaMRlCPqli87Lkvi7eMzSuv1/lNYwrvCMFrO3pE0WmvvHfu3Ll/pOeV1+soXhfBO29j4bITjhTZpIqX69KxL8EbU3iTCq/jECGvh9yzdTF4v/JSvMeYvI0K79lHTF7mhOH+Y6O8vMzbEgqy8ivIC2Teu0nSnw8oOjpE7Pz9y84ucYYUV8r2eVXxSuK1TTB5Rx8zeW+wAtaDJyl5HQsM3i6Fd26c5C1V2lxF8ba/HBU0iOLzqKSwwIsTbWEtXWPfuWWCN6rDyxqOUMBiLHCsvEjFq4y/Jjdef5AuhvNJmEkuE/mkX3yEuFOcM1Lj0QKOznOR6NGhL48tiME6IPFCkbzDAi/KJ5eVfNLrVEKIIV5WwErNq+RXKl4/yicDON/DWR+PeeP6vAJgBPOijEzNayL8uXyYyifxZXjEq4SQrv0k7w9s3lcPGLwqf/7pGrlH5M9u15SKF+ZXc2I+Kfqz8AhR4B1m8EZS8Qb+puY9foxav0o6HQpvjOCtVa/UiXoRTh+vOGo2TMyPnArvlMQbUcUrgrcPtlnNO5cp70KE5iVCSOweOR4xx9/CpwzeXhsVnwo4Kp1+PErwNqt5Vet1fpNd4S2PauyLcOdsmfDOWVS8cpeaIt4ntC6QS5MvFHaWfal84zq4RvGKC3Y6vOr1OsjrU9oc1dgXPf2yGLKvR+BdTsELiPcnJ4n8eQcxNWT139bDRIe9WP/cQ/Jew+FZy7tf4NWMvzMPdHmrBdwU/kzcK0+QNf4mnaEpJq+18omMS/I+79Py5oXJgHUNAJJXCFci736FNyb4s5a3W25zMafiRd4MZ1KkP0f2Erykb9gM8eZr578/Pr9B8DInDL3Uo9+bFO8Po8r6s5/kveeX13McxPiLX5ETeXmVP6POCyd2BO9cJMDmhfPNfMZ6TpJ0MRAn3n+Wl+tugMcKLzO/ymvjqRGJu3nxiXQDfhafEOLxl+QF/ZC3bAV/O58P/1wReKv0eI8J3mwh+i80OMlL9AWR975Qv3gByOuneYn1ulHZwEDh1VmALqNm/NwTz3cS7wvxwy4Cr1nF20ZLxTtB82JvRkscCi88oM/rtnfn0fXn0bwBO8mrPE15pfDaWN0X6mCIAPaARxLuNemVBswrvD4p88bKemiVmf0mYf1Q4I1RvMib8RKHzIvcm+JV+sIE4vWp6u+pUvMSzwettY5nkkdfuCE89dZ/vn/wsOzCBZyMe/GR9MXaLF7Aq5WGF3VeghcanM6fib4/wTe67ZoLgCWS12enP78wKgLvAC84YXro0H9/oyzseHHtoth/JdwfgPQCh5bX7nZqlW8S1peENrtUvAKuxItxad4qipdxATcZQtS8Fccd2JF3cOAR7suvQinez2nrXQk9f3Lz2s8/i7w/37SFF8j3VUxj4Z2EMzG/oMzkVXhbVLwWYX1S5J2L4N0UvKzq/THl8ylojZp6/lsx6Hh1A9lXmDw8cbGCs6LtvyzfCfMOG/f88atXjx/ZQK3ytemI1x0Pd05BoQ9MtAQ6nAxek3O4rxme0onOKY41Ct/gJvDOD4wPIFUj3u/nx4U9ef6LvsfuPi7bgsry/UXa+k3uUtDVLDahy5cIqj+vUR12vHqGx98dz57H9F5WkXjRq2mXf7nCdS8Pjg7WUl8SD3n90Rj+LAz+MMxhPsaVanlnYCeTzwnxsSV0UwTec6clfXl06OiQtDMk86rLJoNa63rUTVC/n1NxyReygR9ePB4O3dd9F4ngRQpf+myP5h/tqUx47k8JnynpElSFuhit0livcIpggK4JkHTCw5iX0JFD5B7mhWX3a8oGVdU7hx900k0A/dr3635Z5nx3Hi7/Yvh9b+6S9n3vWsABn0rAoxYHRqgzRnh8Dp+WF5dVVc9r69c2geMD8yrezy47rmT0fruW17pga1+Dooj3kFcW9GZl5wDiXUPl07SF14d33vb5/2SvfYg3ek5aczYfHTp0WtoBmHdNtVNvamfLa7VWKN8hbq22fb4GYftGj0jvbCDec9KOyLsG2WphO+W2Zss7/zIQGF0Q/rWlycmKAOtfSDEqPi0vn74SXe2tmBwMhCvn0T8etcW6+/LlzHiv3AHh7oHR2derq9855icXFhZGw6CyNuCrylpcWt4sK77LAcCPzoP6t6uvbS9hWyfnAyB8JxPeh7O/rq6+DvFvTpw48eEtD2Z5/rvf3r/mwd3yYkXlSMUqqQ59hYSPrKTlTVcX6y/l5VWAe7v6tj70+gNs7O8ccMwC/u37VY/jyuXLxngvP3Qg0BO/vzlx+9atd7dX33/4fRXVtopezPb1SddUWGg+De9XRnnLqRrLVXXR1YobIwCDfnj/4fa7W7f+eLP6+4ffsJk4EA4/uJKWt+0hAKH3J3DhE+9wCvrHiRO34YHCW3+8Xf3trQdUqWynZqQNAf8vNsqr3B0WoebmFletgNjShxPvkFVu47beQm098cetwlv/ffsbdFHWo1BSrYBbffNGBJV0C/8H9Q7duNdAdVmNHZiOnrl90/KO8K/fv/lwm26r3Fjkom9COnN9ybpgCXkHjUvVduvdie88uuZMYQuB99xRUYj3yy/EHZ3+S9Yj38Ny+VA3/x629XaKtt76473+y/xIvTzyDr0aRP3XDEa0RiAsqs87HJXEQV5O3qF4ZX9hurd8qByswviSpq23ONCdgnjlre7tIoFXOU8qXnUDFV7ikS/Mn1XPf8uVEgSvXrXFVeCDrh8qevbbr4d1ZsBtbW2h33YY0LsPb7i75RlqpW9q3wGKl9w73VXGV2VW4d36/zPS2NsffuXxOp9aZSGOC/EOI4LZUhbieJtSBXr/mdrLQoba6uB4CMavaENz2SetlHE6p5xyyimnnHLKKaeccsopp5xyyimnnHLKKaeccspE/w8h58+3B1TonwAAAABJRU5ErkJggg==",
          name: "Banking"
        },
        {
          img: "data:image/png;base64,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",
          name: "Forex"
        },
        {
          img: "https://img.capital.com/imgs/glossary/600x300x1/Indices.jpg",
          name: "Indices"
        }
      ])
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }


  return (
    <View className={styles.container}>
            {quizedata.map((image, index) => (
              <>{data!==null&&
        <Pressable onPress={()=>{data.hasOwnProperty(image.name)?console.log("disabled"):router.push({ pathname: '/quiz', params:  {name:image.name,id:index}  })}} key={index} style={{borderRadius:18}} className='px-2 flex-1 w-[94%] border border-gray-400 flex flex-row gap-6 items-center rounded-xl bg-[#e5e5e5] '>
          <Image source={{uri:image.img}} className='w-24 h-24 rounded-xl  border border-gray-400' />
              <Text className='text-2xl font-medium'>{image.name}</Text>
              <View className='flex-1 flex justify-end items-end pr-6'>
              <FontAwesome name={data.hasOwnProperty(image.name)?"lock":"arrow-right"} color="black"/></View>
        </Pressable>}</>
      ))}
   
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center gap-6 py-2`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
