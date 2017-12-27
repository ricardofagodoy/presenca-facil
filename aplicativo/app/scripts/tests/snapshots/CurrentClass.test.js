import React from 'react';

// http://airbnb.io/enzyme/docs/api/index.html
import { shallow, mount, render } from 'enzyme';

import ClassCard from 'views/components/ClassCard';

const title = 'Aula atual';

const classData = {
  id: 1,
  materia: 'Calculo I',
  local: 'H08 - 15',
  horarioInicio: '19:20',
  horarioFim: '20:50',
  dataProxima: '17/07/1994 - Domingo'
}

test('Show current class to student', () => {
  const wrapper = render(<ClassCard title={title} classData={classData} />);
  expect(wrapper.find('h3').text()).toBe(title);
});