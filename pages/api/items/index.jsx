// pages/api/user
export default async function getItems() {
  const data = [
    {
      id: 1,
      title: 'Volvo',
      category: 'Car',
      description: 'This is a Car',
      url: 'https://www.motortrend.com/uploads/sites/10/2021/12/2021-volvo-xc90-momentum-4wd-suv-angular-front.png',
    },
    {
      id: 2,
      title: 'Volvo',
      category: 'Car',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum lectus ac arcu dignissim auctor eu non mi. Mauris sed posuere tortor. Integer euismod finibus elit, sed suscipit turpis consequat nec. Fusce augue lorem, egestas ac tellus ut, ornare pretium tortor. Cras et purus odio. Vestibulum gravida facilisis ex porttitor sodales. Pellentesque viverra augue nec nisl tristique, eget maximus enim convallis. Mauris tempor enim nulla, in tincidunt est fermentum nec. Maecenas in lectus laoreet, semper dui ac, facilisis enim. Nulla finibus mauris in quam malesuada, id tristique urna pharetra.\nNulla tincidunt vestibulum orci non pellentesque. Donec dolor turpis, imperdiet quis porttitor vitae, semper at sem. Vivamus vulputate purus lorem, vitae pharetra ligula maximus quis. Quisque pellentesque libero sit amet consequat interdum. Curabitur ligula leo, tincidunt sed nunc finibus, elementum condimentum mauris. Proin sed augue ante. Aliquam sit amet libero quam. Maecenas eu enim egestas, ultrices quam facilisis, egestas tellus. Pellentesque eu varius risus. Sed congue suscipit nisi, non consequat urna consectetur eu.',
    },
    {
      id: 3,
      title: 'Volvo',
      category: 'Car',
      description: 'This is a Car',
    },
    {
      id: 4,
      title: 'Volvo',
      category: 'Car',
      description: 'This is a Car',
    },
    {
      id: 5,
      title: 'Volvo',
      category: 'Car',
      description: 'This is a Car',
    },
  ];

  //   const response = await fetch(/* external API endpoint */);
  //   const jsonData = await response.json();
  console.log('returning data');
  return data;
}
